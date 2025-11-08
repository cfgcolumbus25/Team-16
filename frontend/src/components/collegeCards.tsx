import React from "react";
export type collegeDisplay = {
  id: number;
  collegeName: string;
  location?: string;
  cost?: number;
  acceptanceRate?: number;
  clepAccept: number;
  amountOfStudentClepScores: number;
};

const CollegeCards = ({
  id,
  collegeName,
  location,
  cost,
  acceptanceRate,
  clepAccept,
  amountOfStudentClepScores,
}: collegeDisplay) => {
  return (
    <div
      className="relative border p-4 rounded-2xl border-gray-300 bg-white hover:shadow-md transition-shadow"
      style={{ cursor: "pointer" }}
    >
      {/* Badge in the corner */}
      <div className="absolute top-3 right-3 px-2 py-1 rounded-full border bg-amber-200 border-amber-900">
        <div className="text-amber-900 font-semibold text-xs">
          {clepAccept} / {amountOfStudentClepScores}
        </div>
      </div>

      {/* College Info */}
      <div className="flex items-start space-x-3">
        <div className="min-w-0">
          <div className="font-semibold text-black mb-1 text-xl">
            {collegeName}
          </div>

          <div className="text-md text-gray-600 mb-2">{location}</div>

          <div className="flex flex-row gap-x-4 text-md">
            <div>Cost:</div>
            <div className="font-medium">${cost}</div>

            <div>Acceptance Rate:</div>
            <div className="font-medium">{acceptanceRate}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCards;
