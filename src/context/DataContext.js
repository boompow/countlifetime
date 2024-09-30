import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(false);

  const [people, setPeople] = useState([]);

  const [addedCount, setAddedCount] = useState(10); //allows a maximum of 6 content boxes to be displayed
  const [birthDay, setBirthDay] = useState(0);
  const [birthMonth, setBirthMonth] = useState(0);
  const [birthYear, setBirthYear] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [ageYear, setAgeYear] = useState(0);
  const [name, setName] = useState("you");
  const [search, setSearch] = useState("");

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setProfile] = useState(false);

  const act =
    localStorage.getItem("act") === null || localStorage.getItem("act") === true
      ? true
      : false;
  const [isActivated, setIsActivated] = useState(act);
  localStorage.removeItem("act");

  const [token, setToken] = useState("");
  const [receiveEmail, setReceiveEmail] = useState(false);

  return (
    <DataContext.Provider
      value={{
        userData,
        birthDay,
        birthMonth,
        birthYear,
        name,
        ageYear,
        showCard,
        people,
        search,
        addedCount,
        showLogin,
        showProfile,
        showSignup,
        loggedin,
        token,
        receiveEmail,
        userId,
        isLoading,
        backgroundColor,
        isActivated,
        setUserData,
        setBirthDay,
        setBirthMonth,
        setBirthYear,
        setName,
        setAgeYear,
        setShowCard,
        setPeople,
        setSearch,
        setAddedCount,
        setShowLogin,
        setShowSignup,
        setProfile,
        setLoggedin,
        setToken,
        setReceiveEmail,
        setUserId,
        setIsLoading,
        setBackgroundColor,
        setIsActivated,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// export default DataContext;
