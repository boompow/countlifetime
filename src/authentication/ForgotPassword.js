import React, { useState } from "react";
import useDataContext from "../hooks/useDataContext";
import "../style/forgotPassword.css";
import UseWarningHandler from "../hooks/useWarningHandler";

const ForgotPassword = () => {
  const { setShowLogin, setIsLoading } = useDataContext();
  const [email, setEmail] = useState("");
  const [onEmailSent, setOnEmailSent] = useState(false);

  const [status, setStatus] = useState("");
  const [allow, setAllow] = useState(false);
  const [backendError, setBackendError] = useState("");

  const api = process.env.REACT_APP_API;

  const server = async () => {
    try {
      const response = await fetch(
        // "http://localhost:4000/api/email/reset-password",
        // "https://api.2.countlifetime.com/api/email/reset-password",
        `${api}/api/email/reset-password`,
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
      if (!data.error) {
        setIsLoading(false);
        const code_id = data.resetData.resetID;
        const code_code = data.resetData.resetCode;
        localStorage.setItem("resetID", code_id);
        localStorage.setItem("resetCode", code_code);
        setOnEmailSent(true);
      } else {
        setIsLoading(false);
        setBackendError(data.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="forgotPasswordPage">
      <div
        style={{ display: onEmailSent ? "flex" : "none" }}
        className="forgotPasswordPageContainer"
      >
        <h2>📧 Email Has Been Sent!</h2>
        <div className="decoration2"></div>
      </div>
      <div
        style={{ display: !onEmailSent ? "flex" : "none" }}
        className="forgotPasswordPageContainer"
      >
        <h1>Reset Password</h1>
        <p>We'll send you password reset instructions.</p>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <UseWarningHandler
            email={email}
            classname={"signup_warning"}
            allow={allow}
            operation={"forgotPassword"} // to tailor the error warnings to forgot password
            setStatus={setStatus}
            setBackendError={setBackendError}
            backendError={backendError}
          />
          <input
            title="Email"
            value={email}
            placeholder="Enter E-mail"
            type="email"
            onClick={(e) => e.target.select()}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
            }}
          />
          <button
            title="Send Reset Email"
            onClick={(e) => {
              e.preventDefault();
              setAllow(true);
              if (status) {
                setIsLoading(true);
                server();
              }
            }}
          >
            Send Reset Email
          </button>
        </form>
        <div>
          <p>Remember your password?</p>
          <p
            className="loginLink2"
            title="Login"
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Login
          </p>
        </div>
        <div className="decoration"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
