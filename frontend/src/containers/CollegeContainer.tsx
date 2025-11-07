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
  ];

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.collegeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-[50%]">
      <input
        type="text"
        placeholder="Search College Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 text-sm mr-2 bg-white rounded-3xl"
      />
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2">
        {filteredColleges.map((resident, index) => (
          <CollegeCards key={index} {...resident} />
        ))}
      </div>
    </div>
  );
};

export default CollegeContainer;
