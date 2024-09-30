import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";
import "../style/confirmEmail.css";
import UseWarningHandler from "../hooks/useWarningHandler";

const ConfirmCode = () => {
  const {
    setUserData,
    setToken,
    setPeople,
    setAddedCount,
    setLoggedin,
    setReceiveEmail,
    setUserId,
    setIsLoading,
    setIsActivated,
  } = useDataContext();
  const email = localStorage.getItem("email");
  const [code, setCode] = useState("");

  const [status, setStatus] = useState("");
  const [allow, setAllow] = useState(false);
  const [backendError, setBackendError] = useState("");

  const navigate = useNavigate();
  const server = async () => {
    try {
      const response = await fetch(
        // "http://localhost:5000/api/activate"
        "https://api.1.countlifetime.com/api/activate",
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            code: code,
            email: email,
          }),
        }
      );
      const data = await response.json();
      if (!data.error) {
        localStorage.removeItem("email");
        setIsLoading(false);
        const userBirthdate = {
          id: 1,
          name: "you",
          day: data.userData.userBirthdate.day,
          month: data.userData.userBirthdate.month,
          year: data.userData.userBirthdate.year,
          isUser: true,
        };
        const allUserBirthdates = [userBirthdate, ...data.userData.addedDates];

        setUserData(data.userData);
        setReceiveEmail(data.userData.receiveEmail);
        setPeople(allUserBirthdates);
        setToken(data.accessToken);
        setAddedCount(10 - data.userData.addedDates.length);
        setLoggedin(true);
        setUserId(data.userData.userId);
        localStorage.removeItem("act");
        setIsActivated(true);
        navigate("/counter");
        localStorage.setItem("status", true); // to tell the frontend that the user has signup
      } else {
        setIsLoading(false);
        setBackendError(data.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const resend_server = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        // "http://localhost:5000/api/resend-code"
        "https://api.1.countlifetime.com/api/resend-code",
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const data = await response.json();
      // console.log(data);
      if (!data.error) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  };
  return (
    <div className="ConfirmEmailPage">
      <div className="ConfirmEmailPageContainer">
        <h1>Confirm Code</h1>
        <p>Please enter the code we sent on your email.</p>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <UseWarningHandler
            code={code}
            classname={"signup_warning"}
            allow={allow}
            operation={"activation"} // to tailor the error warnings to forgot password
            setStatus={setStatus}
            setBackendError={setBackendError}
            backendError={backendError}
          />
          <input
            title="Code"
            value={code}
            placeholder="Enter Code"
            type="text"
            onClick={(e) => e.target.select()}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <button
            title="Activate Account"
            onClick={(e) => {
              e.preventDefault();
              setAllow(true);
              if (status) {
                server();
                setIsLoading(true);
              }
            }}
          >
            Activate Account
          </button>
        </form>
        <p
          className="resend_code"
          onClick={(e) => {
            e.preventDefault();
            resend_server();
          }}
        >
          Resend Code
        </p>
        <div className="decoration"></div>
      </div>
    </div>
  );
};

export default ConfirmCode;
