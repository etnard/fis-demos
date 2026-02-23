export const LessonsKeys = {
  // Base key for the entity
  all: ["lessons"] as const,

  // Key for getting a list of lessons from the database
  list: () => [...LessonsKeys.all, "list"] as const,
};
