import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import StudentLocationInput from "./StudentLocationInput";
import { useThemeMode } from "../contexts/ThemeContext";

type ClepScore = {
  examName: string;
  score: number;
};

export default function FilterForm() {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const [studentLocation, setStudentLocation] = useState("");
  const [inOrOutOfState, setInOrOutOfState] = useState<boolean | null>(null);

  const [clepScores, setClepScores] = useState<ClepScore[]>([]);
  const [currentExam, setCurrentExam] = useState("");
  const [currentScore, setCurrentScore] = useState<number | string>(50);

  const examList = ["College Algebra", "Biology", "Psychology", "Calculus"];

  const addExam = () => {
    const scoreAsNumber = Number(currentScore);

    if (!currentExam || currentScore === "") {
      alert("Please enter an exam name and score.");
      return;
    }

    if (scoreAsNumber < 20 || scoreAsNumber > 80) {
      alert("Score must be between 20 and 80.");
      return;
    }

    setClepScores([...clepScores, { examName: currentExam, score: scoreAsNumber }]);
    setCurrentExam("");
    setCurrentScore(50);
  };

  const removeExam = (indexToRemove: number) => {
    setClepScores(clepScores.filter((_, index) => index !== indexToRemove));
  };

  const submitForm = () => {
    console.log("Submitting →", {
      studentLocation,
      inOrOutOfState,
      clepExamScores: clepScores,
    });
  };

  return (
    <div
      className={`p-6 border rounded-xl bg-white shadow-sm space-y-6 ${
        isDark
          ? "bg-gradient-to-br from-slate-800 to-slate-900 border-blue-700 text-blue-50"
          : "bg-white border-gray-300"
      }`}
    >
      <h2 className="text-xl font-bold">Preferences</h2>

      <StudentLocationInput setStudentLocation={setStudentLocation} />

      {/* State Preference */}
      <div>
        <label className={`font-medium text-sm block ${isDark ? "text-blue-200" : ""}`}>
          State Preference
        </label>
        <select
          className={`border rounded-md p-2 w-full ${
            isDark ? "bg-slate-700 border-blue-600 text-blue-50" : "bg-white border-gray-300"
          }`}
          onChange={(e) => setInOrOutOfState(e.target.value === "in")}
        >
          <option value="">Select...</option>
          <option value="in">In-State</option>
          <option value="out">Out-of-State</option>
        </select>
      </div>

      {/* CLEP Scores */}
      <div>
        <label className={`font-medium text-sm ${isDark ? "text-blue-200" : ""}`}>
          Add CLEP Scores
        </label>

        <div className="flex gap-2 items-end mt-2">
          {/* Test Name */}
          <div className="flex-1">
            <label className="font-medium text-sm block mb-1">Test Name</label>
            <Combobox value={currentExam} onChange={(val) => setCurrentExam(val ?? "")}>
              <div className="relative">
                <Combobox.Input
                  className={`border p-2 rounded-md w-full ${
                    isDark ? "bg-slate-700 border-blue-600 text-blue-50" : "bg-white border-gray-300"
                  }`}
                  placeholder="Exam Name"
                  onChange={(e) => setCurrentExam(e.target.value)}
                />
                <Combobox.Options
                  className={`absolute z-10 w-full mt-1 border rounded-md shadow-lg ${
                    isDark ? "bg-slate-800 border-blue-600 text-blue-50" : "bg-white border-gray-300"
                  }`}
                >
                  {examList.map((exam) => (
                    <Combobox.Option
                      key={exam}
                      value={exam}
                      className={`p-2 cursor-pointer ${
                        isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"
                      }`}
                    >
                      {exam}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>

          {/* Score */}
          <div>
            <label className="font-medium text-sm block mb-1">Score:</label>
            <input
              type="number"
              min={20}
              max={80}
              value={currentScore}
              onChange={(e) =>
                setCurrentScore(e.target.value === "" ? "" : Number(e.target.value))
              }
              className={`w-20 border p-2 rounded-md ${
                isDark ? "bg-slate-700 border-blue-600 text-blue-50" : "bg-white border-gray-300"
              }`}
            />
          </div>

          <button
            onClick={addExam}
            className="px-3 py-2 bg-amber-200 border-amber-900 text-black rounded-md"
          >
            Add +
          </button>
        </div>

        {/* Added list */}
        <div className="mt-3 space-y-1">
          {clepScores.map((item, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center text-sm ${
                isDark ? "text-blue-200" : "text-gray-700"
              }`}
            >
              <span>• {item.examName} — Score: {item.score}</span>
              <button
                onClick={() => removeExam(idx)}
                className="ml-2 px-2 py-0.5 rounded-full bg-amber-200 border border-amber-900 text-black"
              >
                &minus;
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={submitForm}
        className="w-full bg-amber-200 border-amber-900 text-black py-2 rounded-md font-semibold"
      >
        Submit
      </button>
    </div>
  );
}
