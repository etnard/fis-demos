import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { getClient } from "@/lib/supabase";

/**
 * GET /api/lessons
 * Fetches all lessons from the database and returns them as JSON.
 * If an error occurs, it captures the exception with Sentry and returns a 500 status code with the error message.
 * @returns {Promise<NextResponse>} A JSON response containing the lessons data or an error message.
 */
export async function GET() {
  const supabase = getClient();

  const { data, error } = await supabase.from("lessons").select("*");

  if (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
