import { LessonsRow, Lessons } from "../models/Lessons";

/**
 * Fetches the list of lessons (LessonsRecord array).
 */
export async function getLessons() {
  const res = await fetch("/api/lessons");
  if (!res.ok) throw new Error("Failed to fetch lessons list");

  const rows: LessonsRow[] = await res.json();
  return rows.map((row) => new Lessons(row));
}
