import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";
import "../style/newPassword.css";
import { UsePassword } from "../hooks/useRegistrationInputs";
import UseWarningHandler from "../hooks/useWarningHandler";

const NewPassword = () => {
  const {
    setUserData,
    setToken,
    setPeople,
    setAddedCount,
    setLoggedin,
    setReceiveEmail,
    setUserId,
    errorState,
    setErrorState,
    setIsLoading,
  } = useDataContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState("");
  const [allow, setAllow] = useState(false);
  const [backendError, setBackendError] = useState("");

  const api = process.env.REACT_APP_API;

  const navigate = useNavigate();

  const server = async () => {
    if (localStorage.getItem("resetID") && localStorage.getItem("resetCode")) {
      try {
        const response = await fetch(
          // "http://localhost:5000/api/reset-password",
          // "https://api.1.countlifetime.com/api/reset-password",
          `${api}/api/reset-password`,
          {
            headers: {
              "Content-type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              id: localStorage.getItem("resetID"),
              password: password,
            }),
          }
        );
        const data = await response.json();
        // console.log(data);
        if (!data.error) {
          setIsLoading(false);
          localStorage.removeItem("resetID");
          localStorage.removeItem("resetCode");

          const userBirthdate = {
            id: 1,
            name: "you",
            day: data.userData.userBirthdate.day,
            month: data.userData.userBirthdate.month,
            year: data.userData.userBirthdate.year,
            isUser: true,
          };
          const allUserBirthdates = [
            userBirthdate,
            ...data.userData.addedDates,
          ];

          setUserData(data.userData);
          setReceiveEmail(data.userData.receiveEmail);
          setPeople(allUserBirthdates);
          setToken(data.accessToken);
          setAddedCount(10 - data.userData.addedDates.length);
          setLoggedin(true);
          setUserId(data.userData.userId);
          navigate("/counter");
          localStorage.setItem("status", true); // to tell the frontend that the user has signup
        } else {
          setIsLoading(false);
          setBackendError(data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    } else {
      // console.log("reset code not found");
    }
  };

  return (
    <div className="newPasswordPage">
      <div className="newPasswordPageContainer">
        <h1>Set New Password</h1>
        <p>Please enter your email and new password.</p>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <UseWarningHandler
            password={password}
            confirmPassword={confirmPassword}
            classname={"signup_warning"}
            allow={allow}
            operation={"passwordReset"} // to tailor the error warnings to password reset
            setStatus={setStatus}
            setBackendError={setBackendError}
            backendError={backendError}
          />
          <UsePassword
            password={password}
            setPassword={setPassword}
            classname={"NewPassword"}
            title={"New Password"}
            errorState={errorState}
            setErrorState={setErrorState}
          />
          <UsePassword
            password={confirmPassword}
            checkPassword={password}
            setPassword={setConfirmPassword}
            classname={"NewPassword"}
            title={"Confirm Password"}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              // console.log("reset clicked");
              setAllow(true);
              if (status) {
                server();
                setIsLoading(true);
              }
            }}
          >
            Set Password
          </button>
        </form>
        <div className="decoration"></div>
      </div>
    </div>
  );
};

export default NewPassword;
