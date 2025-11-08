import React, { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import StudentLocationInput from "./StudentLocationInput";
import { useDebounce } from "use-debounce";

type ClepScore = {
  examName: string;
  score: number;
};

// Define a type for the API response
type University = {
  name: string;
  country: string;
};

export default function FilterForm() {
  const [studentLocation, setStudentLocation] = useState("");
  // const [collegePreference, setCollegePreference] = useState("");
  const [inOrOutOfState, setInOrOutOfState] = useState<boolean | null>(null);

  const [clepScores, setClepScores] = useState<ClepScore[]>([]);
  const [currentExam, setCurrentExam] = useState("");
  const [currentScore, setCurrentScore] = useState<number | string>(50);

  // const [collegeQuery, setCollegeQuery] = useState("");
  // const [debouncedCollegeQuery] = useDebounce(collegeQuery, 300);
  // const [universitySuggestions, setUniversitySuggestions] = useState<University[]>([]);

  const examList = ["College Algebra", "Biology", "Psychology", "Calculus"];

  /*
  useEffect(() => {
    if (debouncedCollegeQuery) {
      fetch(
        `http://universities.hipolabs.com/search?name=${debouncedCollegeQuery}&country=United States`
      )
        .then((res) => res.json())
        .then((data) => {
          setUniversitySuggestions(data);
        })
        .catch((err) => {
          console.error("Failed to fetch universities:", err);
          setUniversitySuggestions([]);
        });
    } else {
      setUniversitySuggestions([]);
    }
  }, [debouncedCollegeQuery]);
  */

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
    const payload = {
      studentLocation,
      // collegePreference,
      inOrOutOfState,
      clepExamScores: clepScores,
    };

    console.log("Submitting →", payload);
  };

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm space-y-6">
      <h2 className="text-xl font-bold">Preferences</h2>

      <StudentLocationInput setStudentLocation={setStudentLocation} />

      {/*
      <div>
        <label className="font-medium text-sm">College Preference</label>
        <Combobox value={collegePreference} onChange={(val) => setCollegePreference(val ?? "")}>
          <div className="relative">
            <Combobox.Input
              className="w-full border p-2 rounded-md"
              onChange={(e) => setCollegeQuery(e.target.value)}
              displayValue={(uniName: string) => uniName}
            />
            <Combobox.Options className="absolute z-10 w-full mt-1 border rounded-md bg-white shadow-lg">
              {universitySuggestions.map((uni) => (
                <Combobox.Option
                  key={uni.name}
                  value={uni.name}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {uni.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
      */}

      {/* State Preference */}
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

        <div className="flex gap-2 items-end mt-2">
          <div className="flex-1">
            <label className="font-medium text-sm block mb-1">Test Name</label>
            <Combobox value={currentExam} onChange={(val) => setCurrentExam(val ?? "")}>
              <div className="relative">
                <Combobox.Input
                  className="border p-2 rounded-md w-full"
                  placeholder="Exam Name"
                  onChange={(e) => setCurrentExam(e.target.value)}
                />
                <Combobox.Options className="absolute z-10 w-full mt-1 border rounded-md bg-white shadow-lg">
                  {examList.map((exam) => (
                    <Combobox.Option
                      key={exam}
                      value={exam}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {exam}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>

          <div>
            <label className="font-medium text-sm block mb-1">Score:</label>
            <input
              type="number"
              min={20}
              max={80}
              value={currentScore}
              onChange={(e) => {
                setCurrentScore(e.target.value === "" ? "" : Number(e.target.value));
              }}
              className="w-20 border p-2 rounded-md"
            />
          </div>

          <button
            onClick={addExam}
            className="px-3 py-2 bg-amber-200 border-amber-900 text-black rounded-md"
          >
            Add +
          </button>
        </div>

        <div className="mt-3 space-y-1">
          {clepScores.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm text-gray-700">
              <span>• {item.examName} — Score: {item.score}</span>
              <button
                onClick={() => removeExam(idx)}
                className="ml-2 px-2 py-0.5 rounded-full bg-amber-200 border-amber-900 text-black"
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
