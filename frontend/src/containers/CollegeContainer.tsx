import React, { useState } from "react";
import CollegeCards from "../components/collegeCards";

const CollegeContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [open, setOpen] = useState(false);
  const colleges = [
    {
      id: 1,
      collegeName: "Cornell University",
      location: "Ithaca",
      cost: 100000,
      acceptanceRate: 10,
      clepAccept: 10,
      amountOfStudentClepScores: 20,
    },
    {
      id: 2,
      collegeName: "Ohio State University",
      location: "Ohio",
      cost: 50000,
      acceptanceRate: 10,
      clepAccept: 10,
      amountOfStudentClepScores: 20,
    },
    {
      id: 3,
      collegeName: "University of Maryland",
      location: "Maryland",
      cost: 50000,
      acceptanceRate: 10,
      clepAccept: 10,
      amountOfStudentClepScores: 20,
    },
  ];

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.collegeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-[50%] p-5 bg-gray-200 space-y-2">
      <input
        type="text"
        placeholder="Search College Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 text-sm bg-white rounded-3xl w-full"
      />
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2">
        {filteredColleges.map((college) => (
          <CollegeCards key={college.id} {...college} />
        ))}
      </div>
    </div>
  );
};

export default CollegeContainer;
