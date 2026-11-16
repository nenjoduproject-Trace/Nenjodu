
import { Request, Response } from "express";
import pool from "../config/database";
import {
  translateQuestionToEnglish,
  translateQuestionToLanguage,
} from "../services/translation.service";

export async function translateQuestionForDisplay(
  req: Request,
  res: Response
) {
  try {
    const question = String(req.body.question ?? "").trim();

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question.",
      });
    }

    const targetLanguage = String(req.body.language ?? "")
      .trim()
      .toLowerCase()
      .split("-")[0];
    const sourceLanguage = String(req.body.sourceLanguage ?? "autodetect")
      .trim()
      .toLowerCase()
      .split("-")[0];
    const supportedLanguages = ["en", "ta", "ml", "te", "kn", "hi"];

    if (!supportedLanguages.includes(targetLanguage)) {
      return res.status(400).json({
        success: false,
        message: "Please select a supported language.",
      });
    }

    if (sourceLanguage !== "autodetect" && !supportedLanguages.includes(sourceLanguage)) {
      return res.status(400).json({
        success: false,
        message: "Please select a supported source language.",
      });
    }

    const translation = await translateQuestionToLanguage(
      question,
      targetLanguage,
      sourceLanguage,
    );

    return res.json({
      success: true,
      data: { question: translation.question },
    });
  } catch (error) {
    console.error("Question display translation error:", error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Unknown translation error",
    });
  }
}

export async function translateQuestion(
  req: Request,
  res: Response
) {
  try {
    const question = String(req.body.question ?? "").trim();

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question.",
      });
    }

    const expectedLanguage = String(req.body.language ?? "")
      .trim()
      .toLowerCase()
      .split("-")[0];
    const supportedLanguages = ["en", "ta", "ml", "te", "kn", "hi"];

    if (!supportedLanguages.includes(expectedLanguage)) {
      return res.status(400).json({
        success: false,
        message: "Please select a supported language before asking a question.",
      });
    }

    const translation = await translateQuestionToEnglish(question);
    if (translation.detectedLanguage !== expectedLanguage) {
      return res.status(409).json({
        success: false,
        code: "LANGUAGE_MISMATCH",
        expectedLanguage,
        detectedLanguage: translation.detectedLanguage,
      });
    }

    return res.json({
      success: true,
      data: { question: translation.question },
    });
  } catch (error) {
    console.error("Question translation error:", error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Unknown translation error",
    });
  }
}

export async function getCategories(
  req: Request,
  res: Response
) {
  try {
    const question = String(req.body.question ?? "").trim();

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question.",
      });
    }

    const result = await pool.query(
      `SELECT
          q.id,
          q.question,
          a.answer,
          q.answer_id,
          similarity(
              LOWER(q.question),
              LOWER($1)
          ) AS relevance
      FROM public.questions q
      JOIN public.answers a
          ON q.answer_id = a.id
      WHERE q.status = TRUE
      ORDER BY relevance DESC
      LIMIT 1;`,
      [question]
    );

    if (result.rows.length === 0) {
      const submission = await pool.query(
        `
        INSERT INTO public.questions
          (question, answer_id, answered_by, status)
        SELECT $1, 9999, 'admin', TRUE
        WHERE NOT EXISTS (
          SELECT 1
          FROM public.questions
          WHERE BTRIM(regexp_replace(
            regexp_replace(LOWER(question), '[^[:alnum:][:space:]]', '', 'g'),
            '[[:space:]]+',
            ' ',
            'g'
          )) = BTRIM(regexp_replace(
            regexp_replace(LOWER($1), '[^[:alnum:][:space:]]', '', 'g'),
            '[[:space:]]+',
            ' ',
            'g'
          ))
        );
        `,
        [question]
      );

      return res.status(404).json({
        success: false,
        message: submission.rowCount
          ? "No exact answer was found. Your question has been submitted for review."
          : "No exact answer was found. This question was already submitted for review.",
      });
    }

    return res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Question search error:", error);

    return res.status(500).json({
        success: false,
        message: error instanceof Error
        ? error.message
        : "Unknown database error",
    });
    }
}
