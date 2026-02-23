import { Lessons } from "./Lessons";
import { LearnerProfile } from "@/lib/learner-profiles";
import { describe, it, expect } from "vitest";
import { factory } from "@/test";

describe("Lessons", () => {
  it("returns the correct id", () => {
    const data = factory.build("lessons");
    const lessons = new Lessons(data);
    expect(lessons.id).toBe(data.id);
  });

  it("returns the learner profile", () => {
    const learnerProfile = factory.build("learnerProfile");
    const data = factory.build("lessons", {
      creationMeta: { learnerProfile },
    });
    const lessons = new Lessons(data);
    expect(lessons.learnerProfile).toBeInstanceOf(LearnerProfile);
    expect(lessons.learnerProfile?.label).toBe(learnerProfile.label);
  });

  it("returns the title and description", () => {
    const data = factory.build("lessons");
    const lessons = new Lessons(data);
    expect(lessons.title).toBe(data.title);
    expect(lessons.description).toBe(data.description);
  });

  describe("without learner profile data", () => {
    it("returns null for the learner profile", () => {
      const data = factory.build("lessons", { creation_meta: {} });
      const lessons = new Lessons(data);
      expect(lessons.learnerProfile).toBeNull();
    });
  });
});
