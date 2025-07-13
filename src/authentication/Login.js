import React, { useEffect } from "react";
import useDataContext from "../hooks/useDataContext";
import useClickOutside from "../hooks/useClickOutside";
import { useState } from "react";
import "../style/Login.css";
import UseWarningHandler from "../hooks/useWarningHandler";
import { UsePassword } from "../hooks/useRegistrationInputs";
import {
  scrollbarEnable,
  scrollbarDisable,
} from "../hooks/useScrollbarBlocker";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const Login = () => {
  const {
    showLogin,
    setShowLogin,
    setShowSignup,
    setUserData,
    setPeople,
    setLoggedin,
    setAddedCount,
    setToken,
    setReceiveEmail,
    setUserId,
    setIsLoading,
    backgroundColor,
  } = useDataContext();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [allow, setAllow] = useState(false);
  const [backendError, setBackendError] = useState("");

  const api = process.env.REACT_APP_API;

  const navigate = useNavigate();

  useEffect(() => {
    const persistUser = async () => {
      if (localStorage.getItem("status") && navigator.onLine) {
        try {
          setIsLoading(true);
          const response = await fetch(
            // "http://localhost:5000/api/refreshToken/persist/",
            // "https://api.1.countlifetime.com/api/refreshToken/persist/",
            `${api}/api/refreshToken/persist/`,
            {
              headers: {
                "Content-type": "application/json",
              },
              method: "POST",
              credentials: "include",
              body: JSON.stringify({}),
            }
          );

          const data = await response.json();
          if (response.ok) {
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
            setPeople(allUserBirthdates);
            setToken(data.accessToken);
            setAddedCount(10 - data.userData.addedDates.length);
            setLoggedin(true);
            setReceiveEmail(data.userData.receiveEmail);
            setUserId(data.userData.userId);
            setIsLoading(false);
            // console.log("persisted");
            setShowLogin(false);
          } else {
            setIsLoading(false);
            navigate("/");
          }
        } catch (error) {
          // console.log(error.message);
        }
      } else {
        setIsLoading(false);
      }
    };

    persistUser();
  }, [
    setIsLoading,
    navigate,
    setAddedCount,
    setLoggedin,
    setPeople,
    setShowLogin,
    setToken,
    setUserData,
    setUserId,
    setReceiveEmail,
  ]);

  const loginUser = async (e) => {
    // e.preventDefault();
    if (navigator.onLine) {
      try {
        const response = await fetch(
          // "http://localhost:5000/api/login"
          // "https://api.1.countlifetime.com/api/login",
          `${api}/api/login`,

          {
            headers: {
              "Content-type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        const data = await response.json();
        // localStorage.setItem("token", data);
        if (!data.error) {
          //cleaning up reset code if there is any
          localStorage.removeItem("resetID");
          localStorage.removeItem("resetCode");

          setIsLoading(false);
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

          // console.log(data);
          setUserData(data.userData);
          setPeople(allUserBirthdates);
          setToken(data.accessToken);
          setUserId(data.userData.userId);
          setAddedCount(10 - data.userData.addedDates.length);
          setReceiveEmail(data.userData.receiveEmail);
          setLoggedin(true);
          navigate("/counter");
          setShowLogin(false);
          localStorage.setItem("status", true); // to tell the frontend that the user has signup
        } else {
          setIsLoading(false);
          setBackendError(data.message);
        }
      } catch (error) {
        // console.log(error);
      }
    } else {
      setIsLoading(false);
      setBackendError("Oops, No Network!");
    }
  };

  // removing the whole signup-popup when clicked outside
  const loginRef = useClickOutside(() => {
    scrollbarEnable();
    setShowLogin(false);
  });

  return (
    <div
      className="login"
      style={{
        display: showLogin ? "flex" : "none",
        backgroundColor: backgroundColor,
      }}
    >
      <div ref={loginRef} className="loginContainer">
        <div
          title="Cancel"
          className="Login_cancel"
          onClick={(e) => {
            e.preventDefault();
            setShowLogin(false);
          }}
        >
          <MdCancel />
        </div>
        <h1>Login</h1>
        <UseWarningHandler
          password={password}
          email={email}
          classname={"signup_warning"}
          allow={allow}
          operation={"login"}
          setStatus={setStatus}
          setBackendError={setBackendError}
          backendError={backendError}
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            title="Email"
            value={email}
            placeholder="Enter E-mail"
            type="email"
            className="emailLogin"
            onClick={(e) => e.target.select()}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
            }}
          />
          <UsePassword
            password={password}
            setPassword={setPassword}
            classname={"Login"}
            title={"Password"}
          />
          <button
            className="logBtn"
            title="Login"
            onClick={(e) => {
              setAllow(true);
              if (status) {
                loginUser();
                setIsLoading(true);
              }
            }}
          >
            Log in
          </button>
        </form>
        <div className="loginOptions">
          <p
            className="forgot"
            title="Forgot Your Password"
            onClick={() => {
              navigate("/forgot-password");
              scrollbarEnable();
              setShowLogin(false);
            }}
          >
            Forgot Password?
          </p>
          <p
            className="signupLink"
            title="Register"
            onClick={() => {
              scrollbarDisable();
              setShowSignup(true);
              setShowLogin(false);
            }}
          >
            Register
          </p>
        </div>
        <div className="decoration"></div>
      </div>
    </div>
  );
};

export default Login;
