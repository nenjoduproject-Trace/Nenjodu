import { Request, Response } from "express";
import pool, { isDatabaseUnavailable } from "../config/database";

export async function getGeneralDoubts(_req: Request, res: Response) {
  try {
    const result = await pool.query(
      `SELECT id, doubts, answer
       FROM public.general_doubts
       ORDER BY id ASC`
    );

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
        : "Failed to load general doubts",
    });
  }
}