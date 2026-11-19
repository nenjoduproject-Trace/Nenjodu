import { Request, Response } from "express";
import pool, { isDatabaseUnavailable } from "../config/database";

export async function getCategories(req: Request,res: Response) {
  try {
    const result = await pool.query(
      `SELECT id, name, slug, description FROM categories WHERE is_active = TRUE ORDER BY id ASC`);
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    const unavailable = isDatabaseUnavailable(error);
    res.status(unavailable ? 503 : 500).json({
      success: false,
      message: unavailable
        ? "Database is currently unavailable. Please try again later."
        : "Failed to load categories",
    });
  }
}

export async function getBeliefList(req: Request,res: Response) {
  try {
    const result = await pool.query(
      `SELECT id, book_name, categories_id, content, description, imageurl AS "imageURL" FROM public."booksMASTER" WHERE is_active = TRUE AND categories_id = 1 ORDER BY id ASC`);
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    const unavailable = isDatabaseUnavailable(error);
    res.status(unavailable ? 503 : 500).json({
      success: false,
      message: unavailable
        ? "Database is currently unavailable. Please try again later."
        : "Failed to load belief books",
    });
  }
}