import React from "react";
import type { clepExamsAndScores } from "./collegeCards";

type Props = {
  exams: clepExamsAndScores[];
};

const ShowExamsAccepted = ({ exams }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-x-3 gap-y-2">
        <div className="font-bold text-md">Exam Name</div>
        <div className="font-bold text-md">Threshold Score</div>
        <div className="font-bold text-md">Course Name</div>
        <div className="font-bold text-md">Number of Credits</div>

        {exams.map((exam, index) => (
          <React.Fragment key={index}>
            <div>{exam.examName}</div>
            <div>{exam.thresholdScore}</div>
            <div>{exam.courseName}</div>
            <div>{exam.numberOfCredits}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ShowExamsAccepted;
