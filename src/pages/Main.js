import React from "react";
import ContentBox from "../components/content-box/ContentBox";
import "../style/ContentBox.css";
import "../style/MainPage.css";
import useDataContext from "../hooks/useDataContext";
import AddContentBox from "../components/content-manipulator/AddContentBox";

const Main = () => {
  const { people, search, loggedin } = useDataContext();

  let item_;
  if (!loggedin && localStorage.getItem("not_logged")) {
    item_ = JSON.parse(localStorage.getItem("not_logged"));
  } else if (loggedin) {
    localStorage.removeItem("not_logged");
  }

  //searching content-box
  const searchedNames = people.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="MainPage">
      {loggedin ? (
        searchedNames.map((item) => <ContentBox key={item.id} value={item} />)
      ) : (
        <ContentBox key={item_.id} value={item_} />
      )}
      <AddContentBox />
    </div>
  );
};

export default Main;
