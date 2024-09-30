import React from "react";
import "../style/LandingPage.css";
import LandingPartTwo from "../components/LandingPartTwo";
import LandingPartOne from "../components/LandingPartOne";

const LandingPage = () => {
  return (
    <div className="landing">
      <LandingPartOne />
      <LandingPartTwo />
    </div>
  );
};

export default LandingPage;
