import { useState } from "react";
import CollegeCards, { type collegeDisplay } from "../components/collegeCards";
import { useThemeMode } from "../contexts/ThemeContext";

const CollegeContainer = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCost, setfilterCost] = useState("All");
  const [filterAcceptance, setfilterAcceptance] = useState("All");
  const [filterCredit, setfilterCredit] = useState("All");
  const costOptions = ["All", "< 50,000", "50,000 - 75,000", "> 75,000"];
  const acceptanceOptions = ["All", "< 5%", "5% - 10%", "> 10%"];
  const creditOptions = ["All", "< 18", "18 - 20", "> 20"];
  // const [colleges, setColleges] = useState<collegeDisplay[]>([])
  const colleges = [
    {
      id: 1,
      collegeName: "Cornell University",
      location: "Ithaca",
      cost: 100000,
      acceptanceRate: 10,
      clepAccept: 0,
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
      clepAccept: 0,
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
      clepAccept: 0,
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
      clepAccept: 0,
      amountOfStudentClepScores: 20,
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
      clepAccept: 0,
      amountOfStudentClepScores: 20,
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

  colleges.forEach((college) => {
    college.clepAccept = college.clepExams.length;
  });

  colleges.sort((a, b) => b.clepAccept - a.clepAccept);

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.collegeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCost =
      filterCost === "All" ||
      (filterCost === "< 50,000" && college.cost < 50000) ||
      (filterCost === "50,000 - 75,000" &&
        college.cost >= 50000 &&
        college.cost <= 75000) ||
      (filterCost === "> 75,000" && college.cost > 75000);

    const matchesAcceptance =
      filterAcceptance === "All" ||
      (filterAcceptance === "< 5%" && college.acceptanceRate < 5) ||
      (filterAcceptance === "5% - 10%" &&
        college.acceptanceRate >= 5 &&
        college.acceptanceRate <= 10) ||
      (filterAcceptance === "> 10%" && college.acceptanceRate > 10);

    const matchesCredit =
      filterCredit === "All" ||
      (filterCredit === "< 18" && college.creditLimit < 18) ||
      (filterCredit === "18 - 20" &&
        college.creditLimit >= 18 &&
        college.creditLimit <= 20) ||
      (filterCredit === "> 20" && college.creditLimit > 20);

    return matchesSearch && matchesCost && matchesAcceptance && matchesCredit;
  });

  return (
    <div className="p-5 space-y-2">
      <input
        type="text"
        placeholder="Search College Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`flex-1 px-3 py-2 border text-sm rounded-3xl w-full ${
          isDark
            ? 'bg-slate-700 border-blue-600 text-blue-50 placeholder-blue-300'
            : 'bg-white border-gray-300'
        }`}
      />
      <div className="mb-4 p-1 rounded-lg w-full">
        <div className="flex gap-4 w-full">
          {/* Cost Filter */}
          <div className="flex flex-col flex-1">
            <p className={`text-xs ${
              isDark ? 'text-blue-200' : ''
            }`}>Filter Cost:</p>
            <select
              className={`border p-1 rounded w-full ${
                isDark
                  ? 'bg-slate-700 border-blue-600 text-blue-50'
                  : 'bg-white border-gray-300'
              }`}
              value={filterCost}
              onChange={(e) => setfilterCost(e.target.value)}
            >
              {costOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Acceptance Filter */}
          <div className="flex flex-col flex-1">
            <p className={`text-xs ${
              isDark ? 'text-blue-200' : ''
            }`}>Acceptance:</p>
            <select
              className={`border p-1 rounded w-full ${
                isDark
                  ? 'bg-slate-700 border-blue-600 text-blue-50'
                  : 'bg-white border-gray-300'
              }`}
              value={filterAcceptance}
              onChange={(e) => setfilterAcceptance(e.target.value)}
            >
              {acceptanceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Credit Filter */}
          <div className="flex flex-col flex-1">
            <p className={`text-xs ${
              isDark ? 'text-blue-200' : ''
            }`}>Credit:</p>
            <select
              className={`border p-1 rounded w-full ${
                isDark
                  ? 'bg-slate-700 border-blue-600 text-blue-50'
                  : 'bg-white border-gray-300'
              }`}
              value={filterCredit}
              onChange={(e) => setfilterCredit(e.target.value)}
            >
              {creditOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2 h-[650px]">
        {filteredColleges.map((college) => (
          <CollegeCards key={college.id} {...college} />
        ))}
      </div>
    </div>
  );
};

export default CollegeContainer;
