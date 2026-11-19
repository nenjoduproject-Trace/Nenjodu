import apiUrl from "./api";

export interface GeneralDoubt {
  id: number | string;
  doubts: string;
  answer: string;
}

export async function getGeneralDoubts(): Promise<GeneralDoubt[]> {
  const response = await fetch(apiUrl("/dashboard/general-doubts"));

  if (!response.ok) {
    throw new Error("Failed to load essential questions and facts");
  }

  const result: unknown = await response.json();
  if (
    !isRecord(result)
    || !Array.isArray(result.data)
    || !result.data.every(isGeneralDoubt)
  ) {
    throw new Error("General doubts service returned an invalid response.");
  }

  return result.data;
}

function isGeneralDoubt(value: unknown): value is GeneralDoubt {
  return isRecord(value)
    && (typeof value.id === "number" || typeof value.id === "string")
    && typeof value.doubts === "string"
    && typeof value.answer === "string";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}