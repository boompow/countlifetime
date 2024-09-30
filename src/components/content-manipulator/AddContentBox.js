import React from "react";
import useDataContext from "../../hooks/useDataContext";
import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { UseDay, UseMonth, UseResetDate, UseYear } from "../../hooks/useDate";
import {
  scrollbarDisable,
  scrollbarEnable,
} from "../../hooks/useScrollbarBlocker";
import { RandomColor } from "../../hooks/useRandomColor";
import UseWarningHandler from "../../hooks/useWarningHandler";

const AddContentBox = () => {
  const {
    people,
    setPeople,
    addedCount,
    setAddedCount,
    loggedin,
    userData,
    token,
    backgroundColor,
    setBackgroundColor,
    setIsLoading,
  } = useDataContext();

  const [showInput, setShowInput] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const id = people ? people.length + 1 : 1;

  const [status, setStatus] = useState(false);
  const [allow, setAllow] = useState(false);
  const [backendError, setBackendError] = useState("");

  const newProfile = {
    id: id,
    name: name,
    day: birthDay,
    month: birthMonth,
    year: birthYear,
    isUser: false,
  };

  const addContentBox = (content) => {
    const newArray = [...people, content];
    setPeople(newArray);
  };

  // click out side pop-up to close the popup
  const popRef = useClickOutside(() => {
    scrollbarEnable();
    setShowInput(false);
    setShowButton(true);
  });

  const addToDatabase = async () => {
    const email = userData.email;
    try {
      const response = await fetch(
        // "http://localhost:5000/api/dataCrud/add",
        "https://api.1.countlifetime.com/api/dataCrud/add",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            id,
            email,
            name,
            birthDay,
            birthMonth,
            birthYear,
          }),
        }
      );

      const data = await response.json();
      // console.log(data);
      if (!data.error) {
        setIsLoading(false);
        setAddedCount(addedCount - 1);
        scrollbarEnable();
        setShowInput(false);
        setShowButton(true);
        addContentBox(newProfile);
        setName("");
        setBirthDay("");
        setBirthMonth("");
        setBirthYear("");
        UseResetDate("add");
      } else {
        setIsLoading(false);
        setBackendError(data.message);
      }
    } catch (error) {}
  };

  return (
    <>
      <div
        className="AddContainer"
        style={{
          display: loggedin && showButton && addedCount > 0 ? "block" : "none",
        }}
      >
        <p title="Available" className="label">
          {addedCount}
        </p>
        <button
          title="Add"
          className="AddBtn"
          onClick={() => {
            scrollbarDisable();
            setShowInput(true);
            setShowButton(false);
            setBackgroundColor(RandomColor);
          }}
        >
          +
        </button>
      </div>

      <div
        className="mainAddContainer"
        style={{ display: showInput ? "flex" : "none" }}
      >
        <div
          style={{ backgroundColor: backgroundColor }}
          className="background"
        ></div>
        <div ref={popRef} className="AddInputContainer">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="info">Enter Birth Information</h1>
            <UseWarningHandler
              name={name}
              birthDay={birthDay}
              birthMonth={birthMonth}
              birthYear={birthYear}
              classname={"signup_warning"}
              allow={allow}
              operation={"contentbox"}
              setStatus={setStatus}
              setBackendError={setBackendError}
              backendError={backendError}
            />
            <input
              title="Name of the person the birthdate belongs to"
              className="nameInputLoggedin"
              required
              type="text"
              placeholder={"Name"}
              value={name}
              onClick={(e) => e.target.select()}
              onChange={(e) => {
                setName(e.target.value.toLowerCase());
              }}
            />
            <div className="birthdate">
              <UseDay
                setBirthDay={setBirthDay}
                title={"Day"}
                name={"dayAddContentBox"}
                id={"add"}
              />
              <UseMonth
                setBirthMonth={setBirthMonth}
                title={"Month"}
                name={"monthAddContentBox"}
                id={"add"}
              />
              <UseYear
                setBirthYear={setBirthYear}
                title={"Year"}
                name={"yearAddContentBox"}
                id={"add"}
              />
            </div>

            <div className="inputButtons">
              <button
                className="AddInputButton"
                title="Add"
                onClick={(e) => {
                  e.preventDefault();
                  setAllow(true);
                  // console.log(status);
                  if (status && loggedin) {
                    setIsLoading(true);
                    return addToDatabase();
                  }
                }}
              >
                Add
              </button>
              <button
                className="cancel"
                title="cancel"
                onClick={(e) => {
                  e.preventDefault();
                  scrollbarEnable();
                  setName("");
                  setBirthDay("");
                  setBirthMonth("");
                  setBirthYear("");
                  setShowInput(false);
                  setShowButton(true);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
          <div className="decoration2"></div>
        </div>
      </div>
    </>
  );
};

export default AddContentBox;
