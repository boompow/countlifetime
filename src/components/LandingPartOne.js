import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";
import { scrollbarDisable } from "../hooks/useScrollbarBlocker";
import LandingPageInput from "./LandingPageInput";
import { RandomColor } from "../hooks/useRandomColor";

const LandingPartOne = () => {
  const [getStarted, setGetStarted] = useState(false);
  const { loggedin, setBackgroundColor } = useDataContext();
  const navigate = useNavigate();
  return (
    <div className="LandingPart1">
      <div className="text">
        <h2>Know how long you've lived and</h2>
        <h1 className="more">more</h1>
      </div>
      <div className="body">
        <div className="bodyL">
          <div className="point">
            <div className="star">⭐</div>
            <p>
              Get real-time count ⏲️ of your age from the number of years you
              have lived down to the second.
            </p>
          </div>
          <div className="point">
            <div className="star">⭐</div>
            <p>
              Get a countdown for your birthday 🎂 starting from 14 days before
              your birthday.
            </p>
          </div>
          <div className="point">
            <div className="star">⭐</div>
            <p>
              Recieve reminder emails 📧 of birthdays 🎂🎂🎂 you don't want to
              forget
            </p>
          </div>
          <div className="point">
            <div className="star">⭐</div>
            <p>🎊🎉A Surprise on your Birthday!!!🎉🎊</p>
          </div>
        </div>
        <div className="bodyR">
          {/* <img src={require("../images/countlifetime2-1.png")} alt="logo" /> */}
          <img
            src="https://i.ibb.co/xqNyBc4/countlifetime2-1.png"
            alt="logo"
            border="0"
            width="60%"
          />
          {loggedin || (!loggedin && localStorage.getItem("not_logged")) ? (
            <button
              className="start"
              title="Go to the Counter"
              onClick={(e) => {
                e.preventDefault();
                navigate("/counter");
              }}
            >
              Go to the Counter
            </button>
          ) : (
            <button
              className="start"
              title="Get Started"
              onClick={() => {
                scrollbarDisable();
                setGetStarted(true);
                setBackgroundColor(RandomColor());
              }}
            >
              Get Started
            </button>
          )}
          {getStarted ? (
            <LandingPageInput
              getStarted={getStarted}
              setGetStarted={setGetStarted}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LandingPartOne;
