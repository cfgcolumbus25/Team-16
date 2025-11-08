import React, { useState } from "react";
import { Combobox } from "@headlessui/react";

type ClepScore = {
  examName: string;
  score: number;
};

export default function FilterForm() {
  const [studentLocation, setStudentLocation] = useState("");
  const [collegePreference, setCollegePreference] = useState("");
  const [inOrOutOfState, setInOrOutOfState] = useState<boolean | null>(null);

  const [clepScores, setClepScores] = useState<ClepScore[]>([]);
  const [currentExam, setCurrentExam] = useState("");
  const [currentScore, setCurrentScore] = useState<number>(50);

  // Example autocomplete lists (replace with API results later)
  const locations = ["Ohio", "Texas", "California", "New York"];
  const universities = ["Ohio State", "Texas A&M", "UCLA", "NYU"];
  const examList = ["College Algebra", "Biology", "Psychology", "Calculus"];

  const addExam = () => {
    if (!currentExam) return;
    setClepScores([...clepScores, { examName: currentExam, score: currentScore }]);
    setCurrentExam("");
    setCurrentScore(50);
  };

  const submitForm = () => {
    const payload = {
      studentLocation,
      collegePreference,
      inOrOutOfState,
      clepExamScores: clepScores,
    };

    console.log("Submitting →", payload);

    // In the future:
    // await fetch("/api/filter", { method: "POST", body: JSON.stringify(payload) });
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-xl bg-white shadow-sm space-y-6">

      <h2 className="text-xl font-bold">Preferences</h2>

      {/* Student Location Combobox */}
      <div>
        <label className="font-medium text-sm">Student Location</label>
        <Combobox value={collegePreference} onChange={(val) => setCollegePreference(val ?? "")}>
          <Combobox.Input
            className="w-full border p-2 rounded-md"
            onChange={(e) => setStudentLocation(e.target.value)}
          />
          <Combobox.Options className="border rounded-md bg-white">
            {locations.map((loc) => (
              <Combobox.Option key={loc} value={loc} className="p-2 cursor-pointer hover:bg-gray-100">
                {loc}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>

      {/* College Preference Combobox */}
      <div>
        <label className="font-medium text-sm">College Preference</label>
        <Combobox value={collegePreference} onChange={(val) => setCollegePreference(val ?? "")}>
          <Combobox.Input
            className="w-full border p-2 rounded-md"
            onChange={(e) => setCollegePreference(e.target.value)}
          />
          <Combobox.Options className="border rounded-md bg-white">
            {universities.map((uni) => (
              <Combobox.Option key={uni} value={uni} className="p-2 cursor-pointer hover:bg-gray-100">
                {uni}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>

      {/* In or Out of State */}
      <div>
        <label className="font-medium text-sm block">State Preference</label>
        <select
          className="border rounded-md p-2 w-full"
          onChange={(e) => setInOrOutOfState(e.target.value === "in")}
        >
          <option value="">Select...</option>
          <option value="in">In-State</option>
          <option value="out">Out-of-State</option>
        </select>
      </div>

      {/* CLEP Exam Scores */}
      <div>
        <label className="font-medium text-sm">Add CLEP Scores</label>

        <div className="flex gap-2 items-center mt-2">
        <Combobox value={currentExam} onChange={(val) => setCurrentExam(val ?? "")}>
            <Combobox.Input
              className="border p-2 rounded-md w-full"
              placeholder="Exam Name"
              onChange={(e) => setCurrentExam(e.target.value)}
            />
            <Combobox.Options className="border rounded-md bg-white">
              {examList.map((exam) => (
                <Combobox.Option key={exam} value={exam} className="p-2 hover:bg-gray-100 cursor-pointer">
                  {exam}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>

          <input
            type="number"
            min={20}
            max={80}
            value={currentScore}
            onChange={(e) => setCurrentScore(Number(e.target.value))}
            className="w-20 border p-2 rounded-md"
          />

          <button
            onClick={addExam}
            className="px-3 py-1 bg-blue-600 text-white rounded-md"
          >
            Add +
          </button>
        </div>

        {/* Display Added Exams */}
        <div className="mt-3 space-y-1">
          {clepScores.map((item, idx) => (
            <div key={idx} className="text-sm text-gray-700">
              • {item.examName} — Score: {item.score}
            </div>
          ))}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={submitForm}
        className="w-full bg-emerald-600 text-white py-2 rounded-md font-semibold hover:bg-emerald-700"
      >
        Submit
      </button>

    </div>
  );
}
