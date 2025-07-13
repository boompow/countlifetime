import React from "react";
import useDataContext from "../hooks/useDataContext";
import "../style/ProfilePage.css";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { UsePassword } from "../hooks/useRegistrationInputs";
import { useNavigate } from "react-router-dom";
import UseWarningHandler from "../hooks/useWarningHandler";

const ProfilePage = () => {
  const {
    userData,
    receiveEmail,
    setReceiveEmail,
    token,
    setLoggedin,
    setIsLoading,
  } = useDataContext();
  const [deleteDropdown, setDeleteDropdown] = useState(false);
  const [edit, setEdit] = useState(true);
  const [checkPassword, setCheckPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [PasswordStatus, setPasswordStatus] = useState(true);
  const [newPassword, setNewPassword] = useState("");

  const [status, setStatus] = useState("");
  const [allow, setAllow] = useState(false);
  const [backendError, setBackendError] = useState("");

  const [allowPasswordCheck, setAllowPasswordCheck] = useState(false);
  const [statusPasswordCheck, setStatusPasswordCheck] = useState("");
  const [backendErrorPasswordCheck, setBackendErrorPasswordCheck] =
    useState("");

  const api = process.env.REACT_APP_API;

  const email = userData.email;

  const navigate = useNavigate();

  //server requests
  const confirmationServer = async () => {
    try {
      const response = await fetch(
        // "http://localhost:5000/api/account/check",
        // "https://api.1.countlifetime.com/api/account/check",
        `${api}/api/account/check`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: checkPassword,
          }),
        }
      );
      const data = await response.json();
      if (!data.error) {
        setPasswordConfirmed(true);
        setNewPassword(checkPassword);
        setReceiveEmail(data.userData.receiveEmail);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setBackendErrorPasswordCheck(data.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const editAccountServer = async ({ receive }) => {
    try {
      const response = await fetch(
        // "http://localhost:5000/api/account/edit",
        // "https://api.1.countlifetime.com/api/account/edit",
        `${api}/api/account/edit`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: email,
            receiveEmail: receive,
            password: newPassword,
          }),
        }
      );
      const data = await response.json();
      if (!data.error) {
        setIsLoading(false);
        // console.log(data);
      } else {
        setIsLoading(false);
        setBackendError(data.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const deleteAccountServer = async () => {
    try {
      const response = await fetch(
        // "http://localhost:5000/api/account/delete",
        // "https://api.1.countlifetime.com/api/account/delete",
        `${api}/api/account/delete`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: checkPassword,
          }),
        }
      );
      const data = await response.json();
      // console.log(data);
      if (!data.error) {
        setIsLoading(false);
        setLoggedin(false);
        localStorage.removeItem("status"); // to tell the front end that to not try to send JWT cookie to the server
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <div
        style={{ display: !passwordConfirmed ? "flex" : "none" }}
        className="profilePasswordCheck"
      >
        <div className="profilePasswordCheckContainer">
          <h1>Password Check</h1>
          <p>Please enter your account password.</p>
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <UseWarningHandler
              password={checkPassword}
              classname={"signup_warning"}
              allow={allowPasswordCheck}
              operation={"profilePage"}
              setStatus={setStatusPasswordCheck}
              setBackendError={setBackendErrorPasswordCheck}
              backendError={backendErrorPasswordCheck}
            />
            <UsePassword
              password={checkPassword}
              setPassword={setCheckPassword}
              classname={"NewPassword"}
              title={"Password"}
              // status={""}
            />
            <button
              title="Check Password"
              onClick={(e) => {
                e.preventDefault();
                setAllowPasswordCheck(true);
                if (statusPasswordCheck) {
                  confirmationServer();
                  setIsLoading(true);
                }
              }}
            >
              Check Password
            </button>
          </form>
          <div className="decoration"></div>
        </div>
      </div>
      <div
        style={{ display: passwordConfirmed ? "flex" : "none" }}
        className="profilePage"
      >
        <div className="profileContainer">
          <div className="profileContainer_header">
            <h1>Your Profile</h1>
          </div>
          <div className="profileContainer_body">
            <UseWarningHandler
              password={newPassword}
              classname={"signup_warning"}
              allow={allow}
              operation={"profilePage"}
              setStatus={setStatus}
              setBackendError={setBackendError}
              backendError={backendError}
            />
            <div className="profileContainer_body_username">
              <p>Username:</p>
              <p className="profileContainer_body_value">{userData.username}</p>
            </div>
            <div className="profileContainer_body_email">
              <p>Email:</p>
              <p className="profileContainer_body_value">{userData.email}</p>
            </div>
            <div className="profileContainer_body_password">
              <p>Password:</p>
              <UsePassword
                password={newPassword}
                setPassword={setNewPassword}
                classname={"Profile"}
                title={"Password"}
                status={PasswordStatus}
              />
              <button
                title="Edit"
                style={{ display: edit ? "flex" : "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(!edit);
                  setPasswordStatus(false);
                  // console.log("edit");
                }}
              >
                <MdEdit />
              </button>
              <button
                title="Save"
                style={{ display: !edit ? "flex" : "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  setAllow(true);
                  if (status) {
                    setEdit(!edit);
                    editAccountServer({ receive: receiveEmail });
                    setPasswordStatus(true);
                    // console.log("save");
                  }
                }}
              >
                <FaCheck />
              </button>
            </div>
            <div className="profileContainer_body_toggle">
              <p>Receive Email</p>
              <input
                type="checkbox"
                id="switch"
                className="profile_checkbox"
                defaultChecked={receiveEmail}
                onClick={(e) => {
                  // console.log(e.target.checked);
                  setAllow(true);
                  if (status) {
                    if (e.target.checked) {
                      setReceiveEmail(true);
                      editAccountServer({ receive: true });
                    } else {
                      setReceiveEmail(false);
                      editAccountServer({ receive: false });
                    }
                  }
                }}
              />
              <label
                htmlFor="switch"
                className="toggleContainer"
                style={{ backgroundColor: receiveEmail ? "lime" : "grey" }}
              >
                <div
                  className="toggle"
                  style={{
                    left: receiveEmail ? "58%" : "0",
                    backgroundColor: receiveEmail ? "white" : "rgb(81, 78, 78)",
                  }}
                ></div>
              </label>
            </div>
          </div>
          <div className="profileContainer_body_delete_account">
            <button
              title="Delete Account"
              style={{ display: !deleteDropdown ? "flex" : "none" }}
              onClick={(e) => {
                e.preventDefault();
                setDeleteDropdown(true);
              }}
            >
              Delete Account
            </button>
            <div style={{ display: deleteDropdown ? "flex" : "none" }}>
              <p>😱 Are you sure you want to delete your account?</p>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteAccountServer();
                    setIsLoading(true);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteDropdown(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="decoration3"></div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
