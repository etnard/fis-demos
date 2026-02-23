import { useQuery } from "@tanstack/react-query";
import { LessonsKeys } from "./keys";
import { getLessons } from "../services/getLessons";
import { Lessons } from "../models/Lessons";

/**
 * Hook to fetch the list of Lessons.
 */
export const useGetLessons = ({ retry = true }: { retry?: boolean } = {}) => {
  const query = useQuery<Lessons[], Error>({
    queryKey: LessonsKeys.list(),
    queryFn: getLessons,
    retry,
  });

  return query;
};
