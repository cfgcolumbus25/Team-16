import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import StudentLocationInput from "./StudentLocationInput";
import { useThemeMode } from "../contexts/ThemeContext";
import type { collegeDisplay } from "./collegeCards";
import type { Dispatch, SetStateAction } from "react";

export type filterFormProps = {
  setColleges: Dispatch<SetStateAction<collegeDisplay[]>>;
};

type ClepScore = {
  examName: string;
  score: number;
};

// export type filterFormProps = {
//   setColleges: (colleges: collegeDisplay[]) => [];
// };

export default function FilterForm({ setColleges }: filterFormProps) {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const [studentLocation, setStudentLocation] = useState("");
  const [inOrOutOfState, setInOrOutOfState] = useState<boolean | null>(null);

  const [clepScores, setClepScores] = useState<ClepScore[]>([]);
  const [currentExam, setCurrentExam] = useState("");
  const [currentScore, setCurrentScore] = useState<number | string>(50);

  // --- New States for API Submission ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false); // <-- Added success state

  // const [collegeQuery, setCollegeQuery] = useState("");
  // const [debouncedCollegeQuery] = useDebounce(collegeQuery, 300);
  // const [universitySuggestions, setUniversitySuggestions] = useState<University[]>([]);

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

    setClepScores([
      ...clepScores,
      { examName: currentExam, score: scoreAsNumber },
    ]);
    setCurrentExam("");
    setCurrentScore(0);
  };

  const removeExam = (indexToRemove: number) => {
    setClepScores(clepScores.filter((_, index) => index !== indexToRemove));
  };

  const submitForm = async () => {
    // 1. Transform the CLEP scores array to the new format
    const formattedClepExams = clepScores.map((exam) => ({
      subject: exam.examName, // 'examName' becomes 'subject'
      score: exam.score,
    }));

    // 2. Create the payload with the new keys
    const payload = {
      userLocation: studentLocation,
      inState: inOrOutOfState,
      clepExamsTaken: formattedClepExams,
    };

    console.log("Submitting →", payload);

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // replace this URL with actual API endpoint
      const response = await fetch(
        "http://127.0.0.1:5000/api/clep_policies/filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Send the newly formatted payload
        }
      );

      if (!response.ok) {
        // Handle server errors (e.g., 404, 500)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      setSubmitSuccess(true); // Set success state
      setStudentLocation("");
      setInOrOutOfState(null);
      setClepScores([]);
      setColleges(result);
    } catch (error: any) {
      // Handle network errors or the error thrown above
      console.error("Submission failed:", error);
      setSubmitError(error.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
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
        <label
          className={`font-medium text-sm block ${
            isDark ? "text-blue-200" : ""
          }`}
        >
          State Preference
        </label>
        <select
          className={`border rounded-md p-2 w-full ${
            isDark
              ? "bg-slate-700 border-blue-600 text-blue-50"
              : "bg-white border-gray-300"
          }`}
          onChange={(e) => setInOrOutOfState(e.target.value === "in")}
          value={inOrOutOfState === null ? "" : inOrOutOfState ? "in" : "out"} // Control the component
        >
          <option value="">Select...</option>
          <option value="in">In-State</option>
          <option value="out">Out-of-State</option>
        </select>
      </div>

      {/* CLEP Scores */}
      <div>
        <label
          className={`font-medium text-sm ${isDark ? "text-blue-200" : ""}`}
        >
          Add CLEP Scores
        </label>

        <div className="flex gap-2 items-end mt-2">
          {/* Test Name */}
          <div className="flex-1">
            <label className="font-medium text-sm block mb-1">Test Name</label>
            <Combobox
              value={currentExam}
              onChange={(val) => setCurrentExam(val ?? "")}
            >
              <div className="relative">
                <Combobox.Input
                  className={`border p-2 rounded-md w-full ${
                    isDark
                      ? "bg-slate-700 border-blue-600 text-blue-50"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Exam Name"
                  onChange={(e) => setCurrentExam(e.target.value)}
                />
                <Combobox.Options
                  className={`absolute z-10 w-full mt-1 border rounded-md shadow-lg ${
                    isDark
                      ? "bg-slate-800 border-blue-600 text-blue-50"
                      : "bg-white border-gray-300"
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
                setCurrentScore(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className={`w-20 border p-2 rounded-md ${
                isDark
                  ? "bg-slate-700 border-blue-600 text-blue-50"
                  : "bg-white border-gray-300"
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
              <span>
                • {item.examName} — Score: {item.score}
              </span>
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

      {/* --- Updated Button & Feedback Messages --- */}
      <button
        onClick={submitForm}
        disabled={isSubmitting}
        className="w-full bg-amber-200 border-amber-900 text-black py-2 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {/* Success Message */}
      {submitSuccess && (
        <p className="text-sm text-green-600 mt-2">
          Preferences submitted successfully!
        </p>
      )}

      {/* Error Message */}
      {submitError && (
        <p className="text-sm text-red-600 mt-2">{submitError}</p>
      )}
    </div>
  );
}
