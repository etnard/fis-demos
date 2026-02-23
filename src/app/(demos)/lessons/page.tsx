"use client";

import ListView from "../_components/List";
import DemoNavigationPanel from "../_components/DemoNavigationPanel";
import { LessonsListRecords, Lessons, useGetLessons } from "@/features/lessons";

export default function LessonsDemoPage() {
  // Get lesson array using tanstack query hook
  const { data: lessons, isLoading, isError, error } = useGetLessons();

  if (isError) {
    return <p>Error loading lessons: {error.message}</p>;
  }

  return (
    <>
      <DemoNavigationPanel backRoute="/" />
      <ListView<Lessons>
        records={lessons ?? []}
        title="Lessons"
        createNewRoute="/lessons"
        RenderItem={LessonsListRecords}
        isLoading={isLoading}
      />
    </>
  );
}
