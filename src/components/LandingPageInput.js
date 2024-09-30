import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/MainPage.css";
import useDataContext from "../hooks/useDataContext";
import useClickOutside from "../hooks/useClickOutside";
import { UseDay, UseMonth, UseYear, UseResetDate } from "../hooks/useDate";
import UseWarningHandler from "../hooks/useWarningHandler";
import { scrollbarEnable } from "../hooks/useScrollbarBlocker";

const LandingPageInput = ({ setGetStarted, getStarted, loggedin }) => {
  const navigateTo = useNavigate();
  const { people, setPeople, backgroundColor } = useDataContext();
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [status, setStatus] = useState(false);
  const [allow, setAllow] = useState(false);

  const newProfile = {
    id: people ? people.length + 1 : 1,
    name: "You",
    day: birthDay,
    month: birthMonth,
    year: birthYear,
  };

  const addContentBox = (content) => {
    const newArray = [content];
    setPeople(newArray);
  };

  // click out side pop-up to close the popup
  const popRef = useClickOutside(() => {
    scrollbarEnable();
    setGetStarted(false);
  });

  return (
    <div
      className="mainAddContainer"
      style={{ display: getStarted ? "flex" : "none" }}
    >
      <div
        style={{ backgroundColor: backgroundColor }}
        className="background"
      ></div>
      <div ref={popRef} className="AddInputContainer">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="info">Enter Your Birth Date</h1>
          <UseWarningHandler
            birthDay={birthDay}
            birthMonth={birthMonth}
            birthYear={birthYear}
            classname={"signup_warning"}
            allow={allow}
            operation={"landingPage"}
            setStatus={setStatus}
          />
          <div className="birthdate">
            <UseDay
              setBirthDay={setBirthDay}
              title={"Day"}
              name={"dayLanding"}
              id={"landingPage"}
            />
            <UseMonth
              setBirthMonth={setBirthMonth}
              title={"Month"}
              name={"monthLanding"}
              id={"landingPage"}
            />
            <UseYear
              setBirthYear={setBirthYear}
              title={"Year"}
              name={"yearLanding"}
              id={"landingPage"}
            />
          </div>

          <div className="inputButtons">
            <button
              className="AddInputButton"
              title="Start"
              onClick={(e) => {
                e.preventDefault();
                setAllow(true);
                if (status) {
                  if (!loggedin) {
                    localStorage.setItem(
                      "not_logged",
                      JSON.stringify({
                        id: 1,
                        name: "you",
                        day: birthDay,
                        month: birthMonth,
                        year: birthYear,
                      })
                    );
                  }
                  addContentBox(newProfile);
                  scrollbarEnable();
                  setBirthDay("");
                  setBirthMonth("");
                  setBirthYear("");
                  UseResetDate("landingPage");
                  navigateTo("/counter");
                  setGetStarted(false);
                }
              }}
            >
              Start
            </button>
            <button
              className="cancel"
              title="cancel"
              onClick={(e) => {
                e.preventDefault();
                scrollbarEnable();
                setGetStarted(false);
                setBirthDay("");
                setBirthMonth("");
                setBirthYear("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="decoration2"></div>
      </div>
    </div>
  );
};

export default LandingPageInput;
