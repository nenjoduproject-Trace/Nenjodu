
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeanpub } from "@fortawesome/free-brands-svg-icons";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import {
  getAnswer,
  QuestionLanguageMismatchError,
  translateQuestionForDisplay,
  type Answer,
} from "../../services/askService";
import { useGlobalLoading } from "../../context/LoadingContext";
import { normalizeLineBreaks } from "../../utils/contentText";

function formatAnswerMarkdown(text: string): string {
  const lines = normalizeLineBreaks(text).split("\n");
  const formattedLines: string[] = [];

  for (const line of lines) {
    const bullet = line.match(/^\s*[•●▪◦]\s*(.+)$/);
    if (bullet) {
      formattedLines.push(`- ${bullet[1]}`, "");
      continue;
    }

    const numberedPoint = line.match(/^(\s*)(\d+)\.\s*(.+)$/);
    if (numberedPoint) {
      const [, indentation, number, content] = numberedPoint;
      const titledPoint = content.match(/^([^:\n]+:)(.*)$/);
      const formattedContent = titledPoint
        ? `**${number}\\. ${titledPoint[1].trim()}**${titledPoint[2]}`
        : `${number}\\. ${content}`;
      formattedLines.push(`${indentation}${formattedContent}`, "");
      continue;
    }

    formattedLines.push(line);
  }

  return formattedLines.join("\n");
}

function getPageLanguage(): string {
  const translationCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("googtrans="));
  return translationCookie?.split("/").filter(Boolean).at(-1) ?? "en";
}

const questionPlaceholders: Record<string, string> = {
  en: "Type your Islamic question...",
  ta: "உங்கள் இஸ்லாமிய கேள்வியை உள்ளிடவும்...",
  ml: "നിങ്ങളുടെ ഇസ്‌ലാമിക ചോദ്യം ടൈപ്പ് ചെയ്യുക...",
  te: "మీ ఇస్లామిక్ ప్రశ్నను టైప్ చేయండి...",
  kn: "ನಿಮ್ಮ ಇಸ್ಲಾಮಿಕ್ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
  hi: "अपना इस्लामी सवाल लिखें...",
};

const languageNames: Record<string, string> = {
  en: "English",
  ta: "Tamil",
  ml: "Malayalam",
  te: "Telugu",
  kn: "Kannada",
  hi: "Hindi",
};

const tamilLanguageNames: Record<string, string> = {
  en: "ஆங்கிலம்",
  ta: "தமிழ்",
  ml: "மலையாளம்",
  te: "தெலுங்கு",
  kn: "கன்னடம்",
  hi: "இந்தி",
};

function TypingAnswer({
  text,
  isTyping,
  showFullText,
  onComplete,
}: {
  text: string;
  isTyping: boolean;
  showFullText: boolean;
  onComplete: () => void;
}) {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const markdownText = formatAnswerMarkdown(text);
  const words = markdownText.match(/\S+\s*/g) ?? [];

  useEffect(() => {
    if (!isTyping) {
      return;
    }

    const answerWords = markdownText.match(/\S+\s*/g) ?? [];
    if (answerWords.length === 0) {
      onComplete();
      return;
    }

    let wordIndex = 0;
    const timer = window.setInterval(() => {
      wordIndex += 1;
      setVisibleWordCount(wordIndex);

      if (wordIndex >= answerWords.length) {
        window.clearInterval(timer);
        onComplete();
      }
    }, 90);

    return () => window.clearInterval(timer);
  }, [markdownText, isTyping, onComplete]);

  return (
    <div className="answer-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        components={{
          p: ({ children }) => (
            <p className="answer-paragraph">{children}</p>
          ),
          strong: ({ children }) => <strong>{children}</strong>,
          ol: ({ children }) => (
            <ol className="answer-list">{children}</ol>
          ),
          ul: ({ children }) => (
            <ul className="answer-list">{children}</ul>
          ),
          li: ({ children }) => <li>{children}</li>,
        }}
      >
        {showFullText ? markdownText : words.slice(0, visibleWordCount).join("")}
      </ReactMarkdown>
    </div>
  );
}

interface ConversationEntry {
  id: number;
  question: string;
  questionLanguage?: string;
  answer?: Answer;
  error?: string;
  loading: boolean;
  hidden?: boolean;
}

const ConversationEntryView = memo(function ConversationEntryView({
  entry,
  question,
  questionTranslationError,
  isTyping,
  showFullText,
  onComplete,
}: {
  entry: ConversationEntry;
  question: string;
  questionTranslationError?: string;
  isTyping: boolean;
  showFullText: boolean;
  onComplete: () => void;
}) {
  return (
    <article
      className="answer-result"
      hidden={entry.hidden}
      data-loading={entry.loading}
    >
      <h3 className="answer-question-title">{question}</h3>
      {questionTranslationError && (
        <p className="ask-error" role="status">{questionTranslationError}</p>
      )}
      <p className="ask-loading" role="status">
        <FontAwesomeIcon
          icon={faLeanpub}
          className="ask-loading-icon"
          aria-hidden="true"
        />
        <span>Finding an answer...</span>
      </p>
      {entry.answer && (
        <TypingAnswer
          key={entry.id}
          text={entry.answer.answer}
          isTyping={isTyping}
          showFullText={showFullText}
          onComplete={onComplete}
        />
      )}
      {entry.error && <p className="ask-error">{entry.error}</p>}
    </article>
  );
});

interface StoredChatState {
  question: string;
  conversation: ConversationEntry[];
}

const CHAT_STORAGE_KEY = "nenjodu-ask-chat";

function readChatState(): StoredChatState {
  try {
    const stored = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) {
      return { question: "", conversation: [] };
    }

    const parsed: unknown = JSON.parse(stored);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("question" in parsed) ||
      typeof parsed.question !== "string" ||
      !("conversation" in parsed) ||
      !Array.isArray(parsed.conversation)
    ) {
      throw new Error("Saved Ask chat has an invalid format.");
    }

    return {
      question: parsed.question,
      conversation: parsed.conversation.map((entry: ConversationEntry) =>
        entry.loading
          ? {
              ...entry,
              loading: false,
              error: "This request was interrupted. Please ask again.",
            }
          : entry
      ),
    };
  } catch (error) {
    console.error("Unable to restore the Ask chat session:", error);
    return { question: "", conversation: [] };
  }
}

export default function Ask() {
  const [initialChat] = useState(readChatState);
  const [question, setQuestion] = useState(initialChat.question);
  const [conversation, setConversation] = useState<ConversationEntry[]>(
    initialChat.conversation,
  );
  const [restoredEntryIds] = useState(
    () => new Set(initialChat.conversation.map((entry) => entry.id)),
  );
  const [loading, setLoading] = useState(false);
  const [languageMismatch, setLanguageMismatch] = useState<{
    expected: string;
    detected: string;
  } | null>(null);
  const [typingAnswerId, setTypingAnswerId] = useState<number | null>(null);
  const [pageLanguage, setPageLanguage] = useState(getPageLanguage);
  const [localizedQuestions, setLocalizedQuestions] = useState<
    Record<number, { language: string; text: string }>
  >({});
  const [questionTranslationErrors, setQuestionTranslationErrors] = useState<
    Record<number, { language: string; message: string }>
  >({});
  const [translationActive, setTranslationActive] = useState(
    () => getPageLanguage() !== "en",
  );
  const { beginLoading } = useGlobalLoading();
  const [error, setError] = useState("");
  const nextEntryId = useRef(
    initialChat.conversation.reduce(
      (nextId, entry) => Math.max(nextId, entry.id + 1),
      0,
    ),
  );
  const chatGeneration = useRef(0);
  const questionTranslations = useRef(new Map<string, string>());
  const finishTypingAnswer = useCallback(() => setTypingAnswerId(null), []);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify({ question, conversation }),
      );
    } catch (error) {
      console.error("Unable to save the Ask chat session:", error);
    }
  }, [question, conversation]);

  useEffect(() => {
    const clearChat = () => {
      chatGeneration.current += 1;
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
      setQuestion("");
      setConversation([]);
      setTypingAnswerId(null);
      setError("");
    };

    window.addEventListener("ask-chat-close", clearChat);
    return () => window.removeEventListener("ask-chat-close", clearChat);
  }, []);

  useEffect(() => {
    const updateTranslationState = (event: Event) => {
      const languageCode =
        event instanceof CustomEvent && typeof event.detail === "string"
          ? event.detail
          : getPageLanguage();
      setPageLanguage(languageCode);
      setTranslationActive(languageCode !== "en");
      if (languageCode !== "en") {
        setTypingAnswerId(null);
      }
    };

    window.addEventListener("app-language-change", updateTranslationState);
    return () =>
      window.removeEventListener("app-language-change", updateTranslationState);
  }, []);

  useEffect(() => {
    let active = true;
    const visibleEntries = conversation.filter((entry) => !entry.hidden);

    for (const entry of visibleEntries) {
      const cacheKey = `${entry.id}:${pageLanguage}`;
      if (
        entry.questionLanguage === pageLanguage
        || questionTranslations.current.has(cacheKey)
      ) {
        continue;
      }

      void translateQuestionForDisplay(entry.question, pageLanguage)
        .then((translatedQuestion) => {
          questionTranslations.current.set(cacheKey, translatedQuestion);
          setLocalizedQuestions((questions) => ({
            ...questions,
            [entry.id]: { language: pageLanguage, text: translatedQuestion },
          }));
          if (active) {
            setQuestionTranslationErrors((errors) => {
              const { [entry.id]: _previousError, ...remainingErrors } = errors;
              return remainingErrors;
            });
          }
        })
        .catch((translationError: unknown) => {
          console.error("Unable to translate a previous Ask question:", translationError);
          if (active) {
            setQuestionTranslationErrors((errors) => ({
              ...errors,
              [entry.id]: {
                language: pageLanguage,
                message: "Unable to translate this question.",
              },
            }));
          }
        });
    }

    return () => {
      active = false;
    };
  }, [conversation, pageLanguage]);

  async function handleAsk(
    selectedQuestion: string = question
  ) {
    if (!selectedQuestion.trim()) {
      // setError("Please enter your question.");
      return;
    }

    setQuestion(selectedQuestion);
    setError("");
    setLoading(true);
    const endLoading = beginLoading();

    const entryId = nextEntryId.current++;
    const requestGeneration = chatGeneration.current;
    setConversation((entries) => [
      ...entries,
      {
        id: entryId,
        question: selectedQuestion.trim(),
        questionLanguage: pageLanguage,
        loading: true,
      },
    ]);
    setQuestion("");

    try {
      const [result] = await Promise.all([
        getAnswer(selectedQuestion, pageLanguage),
        new Promise<void>((resolve) => {
          window.setTimeout(resolve, 3000);
        }),
      ]);
      if (requestGeneration !== chatGeneration.current) {
        return;
      }

      if (!result) {
        setConversation((entries) =>
          entries.map((entry) =>
            entry.id === entryId ? { ...entry, hidden: true } : entry
          )
        );
        setQuestion(selectedQuestion);
        return;
      }

      const pageIsTranslated = getPageLanguage() !== "en";
      setTranslationActive(pageIsTranslated);
      setTypingAnswerId(pageIsTranslated ? null : entryId);
      setConversation((entries) =>
        entries.map((entry) =>
          entry.id === entryId
            ? { ...entry, answer: result, loading: false }
            : entry
        )
      );
    } catch (err) {
      if (requestGeneration !== chatGeneration.current) {
        return;
      }

      if (err instanceof QuestionLanguageMismatchError) {
        setConversation((entries) =>
          entries.filter((entry) => entry.id !== entryId)
        );
        setQuestion(selectedQuestion);
        setLanguageMismatch({
          expected: err.expectedLanguage,
          detected: err.detectedLanguage,
        });
        return;
      }

      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setConversation((entries) =>
        entries.map((entry) =>
          entry.id === entryId
            ? { ...entry, error: message, loading: false }
            : entry
        )
      );
      setQuestion(selectedQuestion);
    } finally {
      setLoading(false);
      endLoading();
    }
  }

  const popularQuestions = [
    "What is the purpose of Salah?",
    "How should Muslims treat their parents?",
    "What does the Quran say about patience?",
  ];

  return (
    <div className="page">
      <div className="page-heading">
        <span className="section-label">Ask Islam</span>
        <h1>Ask a Question</h1>
        <p>
          Ask questions about Islam and explore relevant
          Quran and Hadith sources.
        </p>
      </div>

      <div className="ask-container">
        {conversation.length > 0 && (
          <div className="ask-conversation" aria-live="polite">
            {conversation.map((entry) => (
              <ConversationEntryView
                key={entry.id}
                entry={entry}
                question={
                  entry.questionLanguage === pageLanguage
                    ? entry.question
                    : localizedQuestions[entry.id]?.language === pageLanguage
                      ? localizedQuestions[entry.id].text
                      : entry.question
                }
                questionTranslationError={
                  questionTranslationErrors[entry.id]?.language === pageLanguage
                    ? questionTranslationErrors[entry.id].message
                    : undefined
                }
                isTyping={typingAnswerId === entry.id}
                showFullText={
                  translationActive || restoredEntryIds.has(entry.id)
                }
                onComplete={finishTypingAnswer}
              />
            ))}
          </div>
        )}

        <form
          className="ask-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (typingAnswerId !== null) {
              setTypingAnswerId(null);
            } else {
              void handleAsk();
            }
          }}
        >
          <textarea
            placeholder={
              questionPlaceholders[pageLanguage] ??
              questionPlaceholders.en
            }
            rows={1}
            value={question}
            translate="no"
            lang="en"
            className={`notranslate${typingAnswerId !== null ? " is-answer-typing" : ""}`}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                if (typingAnswerId !== null) {
                  setTypingAnswerId(null);
                } else {
                  void handleAsk();
                }
              }
            }}
            aria-label="Your question"
          />

          {error && <p className="ask-error">{error}</p>}

          <button
            className={
              typingAnswerId !== null ? "ask-stop-btn" : "primary-btn"
            }
            type="submit"
            disabled={loading}
            data-typing={typingAnswerId !== null}
          >
            <span className="ask-submit-label">Get Answer →</span>
            <span className="ask-searching-label">Searching...</span>
            <span className="ask-stop-label">
              <span className="ask-stop-icon" aria-hidden="true" />
              Stop
            </span>
          </button>
        </form>
      </div>

      <div className="suggested">
        <h3>Popular Questions</h3>

        {popularQuestions.map((item) => (
          <button
            type="button"
            className="question"
            key={item}
            onClick={() => {
              setQuestion(item);
              setError("");
            }}
            disabled={loading || typingAnswerId !== null}
          >
            {item}
          </button>
        )        )}
      </div>

      {languageMismatch && (
        <div className="language-mismatch-backdrop notranslate" translate="no">
          <section
            className="language-mismatch-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="language-mismatch-title"
            aria-describedby="language-mismatch-message"
          >
            <h2 id="language-mismatch-title">
              {languageMismatch.expected === "ta"
                ? "கேள்வியின் மொழி பொருந்தவில்லை"
                : "Question language mismatch"}
            </h2>
            <p id="language-mismatch-message">
              {languageMismatch.expected === "ta"
                ? `உங்கள் கேள்வி ${
                    tamilLanguageNames[languageMismatch.detected] ??
                    languageMismatch.detected
                  } மொழியில் உள்ளது; ஆனால் தேர்ந்தெடுக்கப்பட்ட மொழி ${
                    tamilLanguageNames[languageMismatch.expected] ??
                    languageMismatch.expected
                  }. தேர்ந்தெடுக்கப்பட்ட மொழியில் கேள்வி கேட்கவும்.`
                : `Your question is in ${
                    languageNames[languageMismatch.detected] ??
                    languageMismatch.detected
                  }, but the selected language is ${
                    languageNames[languageMismatch.expected] ??
                    languageMismatch.expected
                  }. Please ask in the selected language.`}
            </p>
            <button
              className="primary-btn"
              type="button"
              onClick={() => setLanguageMismatch(null)}
            >
              {languageMismatch.expected === "ta" ? "சரி" : "OK"}
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
