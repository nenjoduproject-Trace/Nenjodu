
import API_URL from "./api";

export interface Answer {
  id: number;
  question: string;
  answer: string;
  answer_id: number;
  score?: number;
}

export class QuestionLanguageMismatchError extends Error {
  readonly expectedLanguage: string;
  readonly detectedLanguage: string;

  constructor(
    expectedLanguage: string,
    detectedLanguage: string,
  ) {
    super("The question language does not match the selected language.");
    this.name = "QuestionLanguageMismatchError";
    this.expectedLanguage = expectedLanguage;
    this.detectedLanguage = detectedLanguage;
  }
}

export async function translateQuestionForDisplay(
  question: string,
  language: string,
  sourceLanguage = "autodetect",
): Promise<string> {
  const response = await fetch(`${API_URL}/question/display-translation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, language, sourceLanguage }),
  });
  const result: unknown = await response.json();

  if (!response.ok) {
    const message = isRecord(result) && typeof result.message === "string"
      ? result.message
      : "Failed to translate the question.";
    throw new Error(message);
  }

  if (
    !isRecord(result)
    || !isRecord(result.data)
    || typeof result.data.question !== "string"
  ) {
    throw new Error("Question translation service returned an invalid response.");
  }

  return result.data.question;
}

export async function getAnswer(
  question: string,
  expectedLanguage: string,
): Promise<Answer | null> {
  const translationResponse = await fetch(`${API_URL}/question/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, language: expectedLanguage }),
  });
  const translationResult: unknown = await translationResponse.json();

  if (
    translationResponse.status === 409
    && isRecord(translationResult)
    && translationResult.code === "LANGUAGE_MISMATCH"
    && typeof translationResult.expectedLanguage === "string"
    && typeof translationResult.detectedLanguage === "string"
  ) {
    throw new QuestionLanguageMismatchError(
      translationResult.expectedLanguage,
      translationResult.detectedLanguage,
    );
  }

  if (!translationResponse.ok) {
    const message = isRecord(translationResult)
      && typeof translationResult.message === "string"
      ? translationResult.message
      : undefined;
    throw new Error(
      message || "Failed to translate the question."
    );
  }

  if (
    !isRecord(translationResult)
    || !isRecord(translationResult.data)
    || typeof translationResult.data.question !== "string"
  ) {
    throw new Error("Translation service returned an invalid response.");
  }

  const englishQuestion = translationResult.data.question;
  const response = await fetch(`${API_URL}/question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: englishQuestion }),
  });

  const result = await response.json();

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to find an answer."
    );
  }

  return result.data;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
