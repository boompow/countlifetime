import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaCheck, FaStar } from "react-icons/fa";
import useDataContext from "../../hooks/useDataContext";
import { UseDay, UseMonth, UseResetDate, UseYear } from "../../hooks/useDate";
import UseWarningHandler from "../../hooks/useWarningHandler";
import jwt_decode from "jwt-decode";

const Input = ({
  birthDay,
  birthMonth,
  birthYear,
  name,
  setBirthDay,
  setBirthMonth,
  setName,
  setBirthYear,
  id,
  isUser,
}) => {
  const { userData, loggedin, token, setToken } = useDataContext();
  const [nameVar, setNameVar] = useState(name);
  const [dayVar, setDayVar] = useState(birthDay);
  const [monthVar, setMonthVar] = useState(birthMonth);
  const [yearVar, setYearVar] = useState(birthYear);

  //deleting content-box
  const { people, setPeople, setAddedCount, addedCount } = useDataContext();
  const DeleteContentBox = (id) => {
    // console.log(people);
    const newArray = people.filter((person) => person.id !== id);
    setPeople(newArray);
    setAddedCount(addedCount + 1);
  };

  const [status, setStatus] = useState(false);
  const [allow, setAllow] = useState(false);
  const [backendError, setBackendError] = useState("");

  const [displayVar, setDisplayVar] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(true);
  const [displaySave, setDisplaySave] = useState(false);
  const [editName, setEditName] = useState(false);
  const displayfun = (value) => {
    setDisplayVar(value);
  };

  const monthList = [
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

  const api = process.env.REACT_APP_API;

  //to refresh access token regularly
  useEffect(() => {
    if (loggedin) {
      const timer = setInterval(async () => {
        const exp = jwt_decode(token).exp;
        const isExpired = exp < new Date().getTime() / 1000;
        if (isExpired) {
          try {
            const refreshResult = await fetch(
              // "http://localhost:5000/api/refreshToken/",
              // "https://api.1.countlifetime.com/api/refreshToken/",
              `${api}/api/refreshToken/`,
              {
                headers: {
                  "Content-type": "application/json",
                },
                credentials: "include",
                method: "POST",
              }
            );
            const data = await refreshResult.json();
            if (!data.error) {
              setToken(data.accessToken);
            }
          } catch (error) {
            // console.log(error);
          }
        }
      }, 100);

      return () => clearInterval(timer);
    }
  });

  const deleteFromDatabase = async () => {
    const email = userData.email;
    try {
      const response = await fetch(
        // "http://localhost:5000/api/dataCrud/delete",
        // "https://api.1.countlifetime.com/api/dataCrud/delete",
        `${api}/api/dataCrud/delete`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({
            id,
            email,
            name: nameVar ? nameVar : name,
            birthDay: dayVar ? dayVar : birthDay,
            birthMonth: monthVar ? monthVar : birthMonth,
            birthYear: yearVar ? yearVar : birthYear,
          }),
        }
      );

      const data = await response.json();
      if (!data.error) {
        // if (data) console.log(data);
        DeleteContentBox(id);
      } else {
        // console.log(data.message);
        displayfun(true);
        setBackendError(data.message);
        const timer = setTimeout(() => {
          displayfun(false);
        }, 5000);

        return () => clearTimeout(timer);
      }
    } catch (error) {}
  };

  const editTheDatabase = async () => {
    // console.log(token);
    const email = userData.email;
    try {
      const response = await fetch(
        // "http://localhost:5000/api/dataCrud/edit",
        // "https://api.1.countlifetime.com/api/dataCrud/edit",
        `${api}/api/dataCrud/edit`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          method: "POST",
          body: JSON.stringify({
            id,
            email,
            name: nameVar,
            birthDay: dayVar,
            birthMonth: monthVar,
            birthYear: yearVar,
          }),
        }
      );

      // if (!response.ok) throw Error(response.status);
      const data = await response.json();

      if (!data.error) {
        // console.log(data);
        setName(nameVar);
        setBirthDay(dayVar);
        setBirthMonth(monthVar);
        setBirthYear(yearVar);
        displayfun(false);
        setDisplayEdit(true);
        setDisplaySave(false);
        setEditName(false);
        UseResetDate(`contentBox_${id}`);
      } else {
        // console.log(data.message);
        setBackendError(data.message);
        const timer = setTimeout(() => {
          displayfun(false);
          setDisplayEdit(true);
          setDisplaySave(false);
        }, 5000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="inputContainer">
      <div className="username">
        {editName ? (
          <textarea
            required
            className="usernameInput"
            title="Name"
            placeholder={nameVar ? nameVar : "you"}
            value={nameVar}
            style={{ textDecoration: displaySave ? "underline" : "none" }} // underline the username during edit
            onChange={(e) => {
              setNameVar(e.target.value.toLowerCase());
            }}
            onClick={(e) => e.target.select()}
          />
        ) : (
          <p>{name ? name : "unknown"}</p>
        )}
      </div>
      <div className="birthDateMain">
        <div className="header">
          <h2 className="birthDateTitle">
            Born on {monthList[birthMonth]} {birthDay}, {birthYear}
          </h2>
          <button
            className="edit"
            title="Edit"
            onClick={(e) => {
              displayfun(true);
              setDisplayEdit(false);
              setDisplaySave(true);
              setEditName(true);
            }}
            style={{
              display: displayEdit ? "flex" : "none",
              right: !loggedin ? "1vmin" : "8vmin",
            }}
          >
            <MdEdit />
          </button>

          <button
            className="submitBtn"
            title="Save"
            type="submit"
            onClick={() => {
              setAllow(true);
              if (status) {
                if (!loggedin) {
                  setName(nameVar);
                  setBirthDay(dayVar);
                  setBirthMonth(monthVar);
                  setBirthYear(yearVar);
                  displayfun(false);
                  setDisplayEdit(true);
                  setDisplaySave(false);
                  setEditName(false);
                  UseResetDate(`contentBox_${id}`);
                  localStorage.setItem(
                    "not_logged",
                    JSON.stringify({
                      id: 1,
                      name: nameVar,
                      day: dayVar,
                      month: monthVar,
                      year: yearVar,
                    })
                  );
                }
                if (loggedin) {
                  editTheDatabase();
                }
              }
            }}
            style={{
              display: displaySave ? "flex" : "none",
              right: !loggedin ? "1vmin" : "8vmin",
            }}
          >
            <FaCheck />
          </button>
          {!isUser ? (
            <button
              style={{
                display: loggedin ? "flex" : "none",
              }}
              className="deleteBtn"
              title="Delete"
              onClick={() => {
                setAllow(true);
                if (status && loggedin) {
                  deleteFromDatabase(id);
                }
              }}
            >
              <MdDelete />
            </button>
          ) : (
            <div className="userStar" title="Owner">
              <FaStar />
            </div>
          )}
        </div>

        <div
          className="birthDateContainer"
          style={{ display: displayVar ? "flex" : "none" }}
        >
          <UseWarningHandler
            name={nameVar}
            birthDay={dayVar}
            birthMonth={monthVar}
            birthYear={yearVar}
            classname={"contentbox_warning"}
            allow={allow}
            operation={"contentbox"}
            setStatus={setStatus}
            setBackendError={setBackendError}
            backendError={backendError}
          />

          <form className="birthDateForm" onSubmit={(e) => e.preventDefault()}>
            <UseDay
              setBirthDay={setDayVar}
              title={"Day"}
              name={`dayContentBox_${id}`} // the id attribute for each select tag has to be unique
              classname={"birthDay"}
              id={`contentBox_${id}`}
            />
            <UseMonth
              setBirthMonth={setMonthVar}
              title={"Month"}
              name={`monthContentBox_${id}`}
              classname={"birthMonth"}
              id={`contentBox_${id}`}
            />
            <UseYear
              setBirthYear={setYearVar}
              title={"Year"}
              name={`yearContentBox_${id}`}
              classname={"birthYear"}
              id={`contentBox_${id}`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Input;
