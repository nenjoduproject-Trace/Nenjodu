const TRANSLATE_ENDPOINT = "https://api.mymemory.translated.net/get";

export interface TranslatedQuestion {
  question: string;
  detectedLanguage: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function translateQuestionToEnglish(
  question: string,
): Promise<TranslatedQuestion> {
  return translateQuestionToLanguage(question, "en");
}

export async function translateQuestionToLanguage(
  question: string,
  targetLanguage: string,
  sourceLanguage = "autodetect",
): Promise<TranslatedQuestion> {
  const url = new URL(TRANSLATE_ENDPOINT);
  url.searchParams.set("langpair", `${sourceLanguage}|${targetLanguage}`);
  url.searchParams.set("q", question);

  const response = await fetch(url, {
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(
      `Question translation service failed with status ${response.status}.`,
    );
  }

  const result: unknown = await response.json();
  if (!isRecord(result)) {
    throw new Error("Translation service returned an invalid response.");
  }

  if (
    (result.responseStatus === "403" || result.responseStatus === 403)
    && result.responseDetails === "PLEASE SELECT TWO DISTINCT LANGUAGES"
  ) {
    return { question, detectedLanguage: targetLanguage };
  }

  const responseData = result.responseData;
  if (
    result.responseStatus !== 200
    && result.responseStatus !== "200"
  ) {
    const details = typeof result.responseDetails === "string"
      ? result.responseDetails
      : "Unknown translation service error.";
    throw new Error(`Question translation failed: ${details}`);
  }

  if (
    !isRecord(responseData)
    || typeof responseData.translatedText !== "string"
  ) {
    throw new Error("Translation service returned an invalid translation.");
  }

  const translatedQuestion = responseData.translatedText.trim();

  if (!translatedQuestion) {
    throw new Error("Translation service returned an empty translation.");
  }

  const detectedLanguage = typeof responseData.detectedLanguage === "string"
    ? responseData.detectedLanguage.toLowerCase().split("-")[0]
    : sourceLanguage !== "autodetect"
      ? sourceLanguage
      : "";

  if (!detectedLanguage) {
    throw new Error("Translation service could not detect the question language.");
  }

  return {
    question: translatedQuestion,
    detectedLanguage,
  };
}
