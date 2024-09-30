import React from "react";
import useDataContext from "../hooks/useDataContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setLoggedin } = useDataContext();

  const navigate = useNavigate();

  const logoutUser = async () => {
    const response = await fetch(
      // "http://localhost:5000/api/refreshToken/logout",
      "https://api.1.countlifetime.com/api/refreshToken/logout",
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        method: "POST",
        credentials: "include",
      }
    );
    const data = await response.json();
    // console.log(data);
    if (!data.error) {
      setLoggedin(false);
      localStorage.removeItem("status"); // to tell the front end that to not try to send JWT cookie to the server
      navigate("/");
    }
  };

  return (
    <div className="logout">
      <button
        className="logoutBtn"
        title="Log out"
        onClick={(e) => {
          e.preventDefault();
          logoutUser();
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Logout;
