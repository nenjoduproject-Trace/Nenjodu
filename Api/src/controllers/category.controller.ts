import { Request, Response } from "express";
import pool from "../config/database";

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
    res.status(500).json({success: false,message: "Failed to load categories"});
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
    res.status(500).json({success: false,message: "Failed to load belief books",});
  }
}