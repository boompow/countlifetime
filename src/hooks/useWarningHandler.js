import { useEffect, useState } from "react";

const UseWarningHandler = ({
  operation,
  birthDay,
  birthMonth,
  birthYear,
  username,
  password,
  confirmPassword,
  email,
  classname,
  allow,
  name,
  code,
  setStatus,
  setBackendError,
  backendError,
}) => {
  const [warning, setWarning] = useState("");
  useEffect(() => {
    const regExpName = new RegExp(/[^\w]+/g); // to match all text in the username that is not alphanumeric_
    const regExpNameContentBox = new RegExp(/[^\w ]+/g); // to match all text in the username that is not alphanumeric_
    const regExpCode = new RegExp(/[^0-9]+/g); // to match all text in the username that is not alphanumeric_
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // if (allow) {
    if (
      birthDay &&
      birthMonth &&
      birthYear &&
      ((birthYear === currentYear && birthMonth > currentMonth) ||
        (birthYear === currentYear &&
          birthMonth === currentMonth &&
          birthDay > currentDay))
    ) {
      setStatus(false);
      setWarning("The given date is in the future");
    } else if (
      birthDay &&
      birthMonth &&
      birthYear &&
      ((birthDay > monthLength[birthMonth] && birthMonth !== 1) ||
        (birthDay > 28 && birthMonth === 1 && birthYear % 4 !== 0) ||
        (birthDay > 29 && birthMonth === 1 && birthYear % 4 === 0))
    ) {
      setStatus(false);
      setWarning(
        `"${month[birthMonth]}" Has ${
          birthMonth !== 1
            ? `Only ${monthLength[birthMonth]} Days`
            : `Either 28 or 29 Days`
        }`
      );
    } else if (
      birthDay &&
      birthMonth &&
      birthYear &&
      birthDay === 29 &&
      birthMonth === 1 &&
      birthYear % 4 !== 0
    ) {
      setStatus(false);
      setWarning("You Entered Feb. 29 for Non-leap Year");
    } else if (
      operation === "signup" &&
      (currentYear - birthYear < 18 ||
        (currentYear - birthYear === 18 &&
          (currentMonth < birthMonth ||
            (currentMonth === birthMonth && currentDay < birthDay))))
    ) {
      setStatus(false);
      setWarning("Sorry kid, your too young to have an account");
    }

    //to check missing inputs based on where the handler is used
    else if (
      operation === "signup" &&
      (!birthDay ||
        birthMonth === "" ||
        !birthYear ||
        !username ||
        !password ||
        !confirmPassword ||
        !email)
    ) {
      setStatus(false);
      setWarning("Make Sure to Enter All the Requirements");
    } else if (operation === "login" && (!email || !password)) {
      setStatus(false);
      setWarning("Make Sure to Enter All the Requirements");
    } else if (
      operation === "contentbox" &&
      (!birthDay || birthMonth === "" || !birthYear || !name)
    ) {
      setStatus(false);
      setWarning("Make Sure to Enter All the Requirements");
    } else if (
      operation === "landingPage" &&
      (!birthDay || birthMonth === "" || !birthYear)
    ) {
      setStatus(false);
      setWarning("Make Sure to Enter All Your Birth Information");
    } else if (operation === "profilePage" && !password) {
      setStatus(false);
      setWarning("Make Sure to Enter Your Password");
    } else if (operation === "passwordReset" && !password && !confirmPassword) {
      setStatus(false);
      setWarning("Make Sure to Enter Your Password");
    } else if (operation === "forgotPassword" && !email) {
      setStatus(false);
      setWarning("Make Sure to Enter Your Email");
    } else if (operation === "activation" && !code) {
      setStatus(false);
      setWarning("Make Sure to Enter the Code");
    }
    //
    else if (code && code.match(regExpCode) && code.length !== 6) {
      setStatus(false);
      setWarning(`Please enter the activation code sent to your email`);
    } else if (username && username.match(regExpName)) {
      setStatus(false);
      setWarning(`Special characters not allowed for username`);
    } else if (name && name.match(regExpNameContentBox)) {
      setStatus(false);
      setWarning(`Special characters not allowed for name`);
    } else if (email && (!email.includes("@") || !email.endsWith(".com"))) {
      setStatus(false);
      setWarning(`Email should have '@' character and end with '.com'`);
    } else if (password && password.length < 8) {
      setStatus(false);
      setWarning("Password should have 8 or more characters");
    } else if (password && confirmPassword && password !== confirmPassword) {
      setStatus(false);
      setWarning("The passwords entered do not match");
    } else if (
      (name && name.length > 25) ||
      (username && username.length > 25)
    ) {
      setStatus(false);
      setWarning("The name is too long");
    } else if (backendError) {
      setStatus(true);
      setWarning(backendError);
    } else {
      setStatus(true);
      setWarning("");
    }

    //to show backend errors only for 5 second
    const timer = setTimeout(() => {
      if (backendError) {
        return setBackendError("");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [
    birthDay,
    birthMonth,
    birthYear,
    username,
    email,
    password,
    confirmPassword,
    operation,
    setWarning,
    setStatus,
    name,
    code,
    backendError,
    setBackendError,
  ]);
  if (allow) {
    return (
      <div style={{ display: warning ? "flex" : "none" }} className={classname}>
        {warning}
      </div>
    );
  }
};

export default UseWarningHandler;
