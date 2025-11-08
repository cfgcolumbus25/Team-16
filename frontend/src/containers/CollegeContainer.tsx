import React, { useState } from "react";
import CollegeCards from "../components/collegeCards";

const CollegeContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const colleges = [
    {
      id: 1,
      collegeName: "Cornell University",
      location: "Ithaca",
      cost: 100000,
      acceptanceRate: 10,
      clepAccept: 1,
      amountOfStudentClepScores: 20,
      clepExams: [],
    },
    {
      id: 2,
      collegeName: "Ohio State University",
      location: "Ohio",
      cost: 50000,
      acceptanceRate: 5,
      clepAccept: 5,
      amountOfStudentClepScores: 20,
      clepExams: [],
    },
    {
      id: 3,
      collegeName: "University of Maryland",
      location: "Maryland",
      cost: 50000,
      acceptanceRate: 10,
      clepAccept: 5,
      amountOfStudentClepScores: 20,
      clepExams: [],
    },
    {
      id: 4,
      collegeName: "University of Maryland",
      location: "Maryland",
      cost: 50000,
      acceptanceRate: 10,
      clepAccept: 5,
      amountOfStudentClepScores: 20,
      clepExams: [],
    },
    {
      id: 5,
      collegeName: "University of Maryland",
      location: "Maryland",
      cost: 50000,
      acceptanceRate: 10,
      clepAccept: 5,
      amountOfStudentClepScores: 20,
      clepExams: [],
    },
    {
      id: 6,
      collegeName: "University of Maryland",
      location: "Maryland",
      cost: 50000,
      acceptanceRate: 10,
      clepAccept: 5,
      amountOfStudentClepScores: 20,
      clepExams: [],
    },
  ];
  colleges.sort((a, b) => b.clepAccept - a.clepAccept);
  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.collegeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="p-5 space-y-2">
      <input
        type="text"
        placeholder="Search College Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 text-sm bg-white rounded-3xl w-full"
      />
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2 h-[650px]">
        {filteredColleges.map((college) => (
          <CollegeCards key={college.id} {...college} />
        ))}
      </div>
    </div>
  );
};

export default CollegeContainer;
