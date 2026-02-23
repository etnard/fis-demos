import * as services from "../services/getLessons";
import { QueryProvider } from "@/providers/QueryProvider";
import { Lessons } from "../models/Lessons";
import { describe, it, expect, vi } from "vitest";
import { factory } from "@/test";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetLessons } from "./useGetLessons";

describe("useGetLessons", () => {
  const rows = factory.buildList("lessons", 2);
  const lessons = rows.map((row) => new Lessons(row));

  it("fetches lessons successfully", async () => {
    const spy = vi.spyOn(services, "getLessons").mockResolvedValue(lessons);
    const { result } = renderHook(() => useGetLessons(), {
      wrapper: QueryProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(lessons);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });

  it("handles errors correctly", async () => {
    const error = new Error("Network error");
    const spy = vi.spyOn(services, "getLessons").mockRejectedValue(error);

    const { result } = renderHook(() => useGetLessons({ retry: false }), {
      wrapper: QueryProvider,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBe(error);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });
});
