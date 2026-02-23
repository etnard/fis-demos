import * as supabaseLib from "@/lib/supabase";
import { GET } from "./route";
import { describe, expect, it } from "vitest";
import { prepareTestSchema } from "@/test";

/**
 * Tests for the GET function in the /api/lessons endpoint.
 */
describe("GET", async () => {
  const { factory } = await prepareTestSchema();

  // No lessons in the database
  describe("without any records", async () => {
    it("responds with a 200 status", async () => {
      const response = await GET();
      expect(response.status).toEqual(200);
    });

    // No lessons, so we expect an empty array
    it("responds with an empty array", async () => {
      const response = await GET();
      const body = await response.json();

      expect(body).toEqual([]);
    });
  });

  // There are lessons in the database
  describe("with records", () => {
    it("responds with a 200 status", async () => {
      const response = await GET();
      expect(response.status).toEqual(200);
    });

    // We create a lesson and expect it to be returned in the response
    it("responds with an array of records", async () => {
      const lesson = await factory.create("lessons");
      const response = await GET();
      const body = await response.json();
      expect(body).toEqual([lesson]);
    });
  });

  // We simulate a Supabase error by mocking the getClient function to return an error response
  describe("when a Supabase error occurs", async () => {
    let spy: ReturnType<typeof vi.spyOn>;

    // Mock the getClient function to simulate a Supabase error
    beforeEach(() => {
      spy = vi.spyOn(supabaseLib, "getClient").mockReturnValue({
        from: () => ({
          // @ts-expect-error Irrelevant type mismatch in mock
          select: async () => ({
            data: null,
            error: { message: "Simulated Supabase error" },
          }),
        }),
      });
    });

    // Restore the original getClient function after each test
    afterEach(() => {
      spy.mockRestore();
    });

    it("responds with a 500 status and the error message", async () => {
      const response = await GET();
      expect(response.status).toEqual(500);
    });

    it("responds with the error message", async () => {
      const response = await GET();
      const body = await response.json();
      expect(body).toEqual({ error: "Simulated Supabase error" });
    });
  });
});
