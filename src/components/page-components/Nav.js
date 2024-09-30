import React from "react";
import useDataContext from "../../hooks/useDataContext";

const Nav = () => {
  const { search, setSearch } = useDataContext();

  return (
    <div className="Nav">
      <input
        className="searchBox"
        placeholder="Search Name"
        title="Enter Name"
        type="search"
        required
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default Nav;
