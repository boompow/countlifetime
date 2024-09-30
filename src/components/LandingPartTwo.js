import React from "react";
import { AiFillSetting } from "react-icons/ai";

const LandingPartTwo = () => {
  return (
    <div className="part2">
      <div className="sectionContainer">
        <p className="howTitle">⚙️ How It Works ⚙️</p>
        <div className="box">
          <p className="icon">
            <AiFillSetting />
          </p>
          <p className="section">
            Starts counting from the day after your birthday, not from the exact
            hour, minute, second of birth on your birthday
          </p>
        </div>
        <div className="box">
          <p className="icon">
            <AiFillSetting />
          </p>
          <p className="section">
            On your birthday, the counter doesn't count the hours, minutes, and
            seconds
          </p>
        </div>
        <div className="box">
          <p className="icon">
            <AiFillSetting />
          </p>
          <p className="section">
            If born on Feb 29, your birthday will be celebrated on March 1 in
            non-leap years
          </p>
        </div>
        <div className="box">
          <p className="icon">
            <AiFillSetting />
          </p>
          <p className="section">
            If you are registered, and allow email from the website, a reminder
            email of the birthdays you registered will be sent to you starting 2
            weeks ahead of the upcoming birthday
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPartTwo;
