import "@testing-library/jest-dom";
import { LessonsListRecords } from "./LessonsListRecords";
import { Lessons } from "@/features/lessons";
import { LearnerProfile } from "@/lib/learner-profiles";
import { describe, test, expect, vi, beforeEach, Mock } from "vitest";
import { factory } from "@/test";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Mock the next/navigation useRouter
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Mock the LearnerProfileChip component as it's an external dependency
vi.mock("@/lib/learner-profiles", async (importOriginal) => {
  const actual = (await importOriginal()) as Partial<
    typeof import("@/lib/learner-profiles")
  >;
  return {
    ...actual,
    LearnerProfileChip: ({
      learnerProfile,
      ...props
    }: {
      learnerProfile: LearnerProfile;
    }) => (
      <div data-testid="mock-learner-chip" {...props}>
        Learner Profile: {learnerProfile.label}
      </div>
    ),
  };
});

// Mock the ConfirmationDialog component (Declare globally)
// const MockConfirmationDialog = vi.fn(() => null);

describe("LessonsListRecords", () => {
  const data = factory.build("lessons", {
    id: crypto.randomUUID(),
  });
  const record = new Lessons(data);
  const mockPush = vi.fn();

  beforeEach(() => {
    mockPush.mockClear();

    // FIX: Use the imported 'Mock' type for assertion
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("should render course details and learner chip correctly", () => {
    render(<LessonsListRecords record={record} />);

    // Title and Description
    expect(screen.getByTestId("lesson-list-record-title")).toHaveTextContent(
      record.title,
    );
    expect(
      screen.getByTestId("lesson-list-record-description"),
    ).toHaveTextContent(record.description);

    // Learner chip
    expect(screen.getByTestId("lesson-list-learner-chip")).toHaveTextContent(
      `Learner Profile: ${record.learnerProfile?.label}`,
    );
  });
});
