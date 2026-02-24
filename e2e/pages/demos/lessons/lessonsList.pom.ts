import { Locator, Page } from "@playwright/test";

export class LessonsListPage {
  readonly heading: Locator;

  readonly skeletonWrapper: Locator;
  readonly recordsContainer: Locator;
  readonly allCards: Locator;

  readonly exampleRecordCard: Locator;
  readonly exampleRecordTitle: Locator;
  readonly exampleRecordDescription: Locator;
  readonly exampleRecordLearnerChip: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Lessons" });

    this.skeletonWrapper = page.getByTestId("list-skeleton-wrapper");
    this.recordsContainer = page.getByTestId("record-list-container");
    this.allCards = page.getByTestId("list-item-card");

    this.exampleRecordCard = page.getByTestId("list-item-card").first();
    this.exampleRecordTitle = this.exampleRecordCard.getByTestId(
      "lessons-list-record-title",
    );
    this.exampleRecordDescription = this.exampleRecordCard.getByTestId(
      "lessons-list-record-description",
    );
    this.exampleRecordLearnerChip = this.exampleRecordCard.getByTestId(
      "lessons-list-learner-chip",
    );
  }

  async goto() {
    await this.page.goto("/lessons");
  }

  async getNumberOfRecords() {
    const records = await this.allCards.all();

    return records.length;
  }
}
