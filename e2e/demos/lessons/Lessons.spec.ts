import { test, expect } from "../../base-test";

test.describe("List of generated lessons", () => {
  test.beforeEach(async ({ lessonsListPage: lessonsPage }) => {
    await lessonsPage.goto();

    // Wait for the simulated loading state to clear (100ms delay in React component)
    await expect(lessonsPage.skeletonWrapper).not.toBeVisible();

    // Wait for the records container to appear
    await expect(lessonsPage.recordsContainer).toBeVisible();
  });

  test("should render the list title and create button", async ({
    page,
    lessonsListPage,
  }) => {
    // Verify Title
    await expect(lessonsListPage.heading).toBeVisible();

    // Verify Create Button
    const createButton = page.getByTestId("create-new-button");
    await expect(createButton).toBeVisible();
    await expect(createButton).toHaveText(/Create New/);
  });

  // TODO: this runs against the "public" schema in development. Ideally, it
  // should use the "test_public" schema or a mock.
  test("should render the correct number of list items", async ({ page }) => {
    const listItems = page.getByTestId("list-item-card");
    await expect(listItems).toHaveCount(1);
  });

  test("should display title and description for the first lesson record", async ({
    lessonsListPage,
  }) => {
    // Title
    await expect(lessonsListPage.exampleRecordTitle).toBeVisible();

    // Description
    await expect(lessonsListPage.exampleRecordDescription).toBeVisible();

    // Learner Chip Verification
    await expect(lessonsListPage.exampleRecordLearnerChip).toBeVisible();
  });

  test("should show loading skeleton initially", async ({
    page,
    lessonsListPage,
  }) => {
    // Reload the page to catch the initial loading state
    await page.reload();

    // Verify the skeleton is visible immediately
    await expect(lessonsListPage.skeletonWrapper).toBeVisible();

    // Wait for loading to complete and verify the data appears
    await expect(lessonsListPage.recordsContainer).toBeVisible();
  });
});
