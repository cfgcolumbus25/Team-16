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
      creditLimit: 18, // new field
      lastUpdated: new Date("2025-09-01"), // new field
      clepExams: [
        {
          examName: "College Algebra",
          thresholdScore: 63,
          courseName: "MATH 110",
          numberOfCredits: 3,
        },
        {
          examName: "Introductory Psychology",
          thresholdScore: 55,
          courseName: "PSYCH 1010",
          numberOfCredits: 3,
        },
      ],
    },
    {
      id: 2,
      collegeName: "Ohio State University",
      location: "Ohio",
      cost: 50000,
      acceptanceRate: 5,
      clepAccept: 5,
      amountOfStudentClepScores: 20,
      creditLimit: 20,
      lastUpdated: new Date("2025-08-15"),
      clepExams: [
        {
          examName: "College Composition",
          thresholdScore: 50,
          courseName: "ENGR 1110",
          numberOfCredits: 3,
        },
        {
          examName: "Biology",
          thresholdScore: 60,
          courseName: "BIO 1101",
          numberOfCredits: 4,
        },
        {
          examName: "American Government",
          thresholdScore: 55,
          courseName: "POLSCI 1010",
          numberOfCredits: 3,
        },
      ],
    },
    {
      id: 3,
      collegeName: "University of Maryland",
      location: "Maryland",
      cost: 50000,
      acceptanceRate: 10,
      clepAccept: 5,
      amountOfStudentClepScores: 20,
      creditLimit: 19,
      lastUpdated: new Date("2025-07-10"),
      clepExams: [
        {
          examName: "History of the United States I",
          thresholdScore: 50,
          courseName: "HIST 201",
          numberOfCredits: 3,
        },
        {
          examName: "Spanish Language",
          thresholdScore: 63,
          courseName: "SPAN 103",
          numberOfCredits: 6,
        },
      ],
    },
    {
      id: 4,
      collegeName: "UCLA",
      location: "Los Angeles",
      cost: 60000,
      acceptanceRate: 8,
      clepAccept: 7,
      amountOfStudentClepScores: 30,
      creditLimit: 21,
      lastUpdated: new Date("2025-09-05"),
      clepExams: [
        {
          examName: "Precalculus",
          thresholdScore: 61,
          courseName: "MATH 115",
          numberOfCredits: 3,
        },
        {
          examName: "Chemistry",
          thresholdScore: 65,
          courseName: "CHEM 101A",
          numberOfCredits: 4,
        },
        {
          examName: "Analyzing & Interpreting Literature",
          thresholdScore: 50,
          courseName: "ENGL 100",
          numberOfCredits: 3,
        },
      ],
    },
    {
      id: 5,
      collegeName: "University of Florida",
      location: "Gainesville",
      cost: 48000,
      acceptanceRate: 9,
      clepAccept: 8,
      amountOfStudentClepScores: 25,
      creditLimit: 20,
      lastUpdated: new Date("2025-08-20"),
      clepExams: [
        {
          examName: "Human Growth & Development",
          thresholdScore: 50,
          courseName: "PSY 2012",
          numberOfCredits: 3,
        },
        {
          examName: "Information Systems",
          thresholdScore: 60,
          courseName: "BSC 2010",
          numberOfCredits: 3,
        },
      ],
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
