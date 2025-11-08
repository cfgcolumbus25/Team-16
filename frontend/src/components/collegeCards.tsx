import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShowExamsAccepted from "./ShowExamsAccepted";
import { useThemeMode } from "../contexts/ThemeContext";

export type clepExamsAndScores = {
  examName: string;
  thresholdScore: number;
  courseName: string;
  numberOfCredits: number;
};

export type collegeDisplay = {
  id: number | string;
  collegeName: string;
  lastUpdated?: Date;
  location?: string;
  cost?: number;
  acceptanceRate?: number;
  creditLimit?: number;
  clepAccept: number;
  amountOfStudentClepScores: number;
  clepExams: clepExamsAndScores[];
};

const CollegeCards = ({
  id,
  collegeName,
  lastUpdated,
  location,
  cost,
  acceptanceRate,
  clepAccept,
  creditLimit,
  amountOfStudentClepScores,
  clepExams,
}: collegeDisplay) => {
  const [openMore, setOpenMore] = useState(false);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  
  return (
    <div
      className={`relative border p-4 rounded-2xl hover:shadow-md transition-shadow ${
        isDark
          ? 'border-blue-700 bg-gradient-to-br from-slate-800 to-slate-900 text-blue-50'
          : 'border-gray-300 bg-white'
      }`}
      style={{ cursor: "pointer" }}
    >
      {/* Badge in the corner */}
      <div className="absolute top-3 right-3 px-2 py-1 rounded-full border bg-amber-200 border-amber-900">
        <div className="text-amber-900 font-semibold text-xs">
          {clepAccept} / {amountOfStudentClepScores} Accepted CLEP Exams
        </div>
      </div>

      {/* College Info */}
      <div className="flex items-start space-x-3">
        <div className="min-w-0">
          <div className={`font-semibold mb-1 text-xl ${
            isDark
              ? 'text-blue-50'
              : 'text-black'
          }`}>
            {collegeName}
          </div>
          <div className={`text-md mb-2 ${
            isDark
              ? 'text-blue-200'
              : 'text-gray-600'
          }`}>{location}</div>

          <div className="flex flex-row gap-x-4 text-md mb-2">
            <div>Cost:</div>
            <div className="font-medium">${cost}</div>

            <div>Acceptance Rate:</div>
            <div className="font-medium">{acceptanceRate}%</div>

            <div>Credit Limit:</div>
            <div className="font-medium">{creditLimit}</div>
          </div>
        </div>
      </div>

      {/* Show More button */}
      <button
        className={`flex items-center gap-1 text-md font-semibold transition-colors mt-2 ${
          isDark
            ? 'text-blue-200 hover:text-blue-50'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        onClick={() => setOpenMore(!openMore)}
      >
        SEE MORE
        {openMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>

      {/* Accepted Exams */}
      {openMore && <ShowExamsAccepted exams={clepExams} />}

      {/* Last Updated (month and year only) */}
      <div className={`mt-3 text-sm ${
        isDark
          ? 'text-blue-300'
          : 'text-gray-500'
      }`}>
        Last Updated:{" "}
        {lastUpdated?.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </div>
    </div>
  );
};

export default CollegeCards;
