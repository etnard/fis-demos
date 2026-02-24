"use client";

import { LearnerProfileChip } from "@/lib/learner-profiles";

import { Lessons } from "../models/Lessons";

type LessonsListProps = {
  record: Lessons;
};

export function LessonsListRecords({ record }: LessonsListProps) {
  return (
    <>
      <div className="w-full">
        <div className="col-span-3">
          <h2
            data-testid="lessons-list-record-title"
            className="text-2xl font-semibold"
          >
            {record.title}
          </h2>
          <div
            data-testid="lessons-list-record-description"
            className="text-sm text-gray-600 mb-4 text-justify line-clamp-2"
          >
            {record.description}
          </div>

          <div className="flex justify-between items-center">
            <LearnerProfileChip
              data-testid="lessons-list-learner-chip"
              learnerProfile={record.learnerProfile}
              color="default"
              variant="faded"
            />
          </div>
        </div>
      </div>
    </>
  );
}
