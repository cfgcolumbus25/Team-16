import React from "react";
export type collegeDisplay = {
  id: number;
  collegeName: string;
  location?: string;
  cost?: number;
  acceptanceRate?: number;
  clepAccept: number;
};

const CollegeCards = ({
  id,
  collegeName,
  location,
  cost,
  acceptanceRate,
  clepAccept,
}: collegeDisplay) => {
  return (
    <div
      className="border rounded-2xl p-4 border-gray-500 bg-white hover:shadow-md transition-shadow"
      style={{ cursor: "pointer" }}
    >
      <div className="flex justify-between">
        <div className="text-xl">{collegeName}</div>
        <div className={`px-2 py-1 rounded-full bg-amber-200 border-amber-900 border-2`}>
          <div className={`font-semibold`}>{clepAccept}</div>
        </div>
      </div>

      <div className="flex flex-row space-x-12">
        <p>{location}</p>
        <p>${cost}</p>
        <p>{acceptanceRate}%</p>
      </div>
    </div>
  );
};

export default CollegeCards;
