import React, { useState } from "react";
import CollegeCards from "../components/collegeCards";

const CollegeContainer = () => {
  const [colleges, setColleges] = useState([]);
  return (
    <div className="w-[50%]">
      <CollegeCards
        id={1}
        collegeName="Cornell"
        location="Ithaca"
        cost={100000}
        acceptanceRate={10}
        clepAccept={10/20}
      />
    </div>
  );
};

export default CollegeContainer;
