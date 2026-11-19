import apiUrl from "./api";
import { normalizeLineBreaks } from "../utils/contentText";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  // icon: string;
}

export interface BeliefBooks {
  id: number;
  book_name: string;
  categories: number;
  description: string;
  content: string;
  imageURL: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(apiUrl("/categories"));
  if (!response.ok) {
    throw new Error("Failed to load categories");
  }

  const result = await response.json();
  return result.data.map((category: Category) => ({
    ...category,
    name: normalizeLineBreaks(category.name),
    description: normalizeLineBreaks(category.description),
  }));
}

export async function getBeliefList(): Promise<BeliefBooks[]> {
  const response = await fetch(apiUrl("/categories/belieflist"));
  if (!response.ok) {
    throw new Error("Failed to load belief books");
  }

  const result = await response.json();
  return result.data.map((book: BeliefBooks) => ({
    ...book,
    book_name: normalizeLineBreaks(book.book_name),
  }));
}