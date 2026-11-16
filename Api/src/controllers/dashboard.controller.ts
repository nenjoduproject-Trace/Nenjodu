import { Request, Response } from "express";
import pool from "../config/database";

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
    res.status(500).json({
      success: false,
      message: "Failed to load general doubts",
    });
  }
}