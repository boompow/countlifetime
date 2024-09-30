import React from "react";

export const UseDay = ({ setBirthDay, title, name, classname, id }) => {
  let vday;
  let dayList = [];
  for (let i = 1; i <= 31; i++) {
    dayList.push(i);
  }
  return (
    <>
      <label htmlFor={name} style={{ display: "none" }}></label>
      <select
        name={name}
        id={`${id}_dropdown_day`}
        className={classname}
        required
        title={title}
        defaultValue="default"
        onChange={(e) => {
          vday = parseInt(e.target.value);
          setBirthDay(vday);
        }}
      >
        <option value="default" disabled>
          {title}
        </option>
        {dayList.map((i) => (
          <option key={dayList.indexOf(i)} value={i}>
            {i}
          </option>
        ))}
      </select>
    </>
  );
};

export const UseMonth = ({ setBirthMonth, title, name, classname, id }) => {
  let vmonth;
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

  return (
    <>
      <label htmlFor={name} style={{ display: "none" }}></label>
      <select
        name={name}
        id={`${id}_dropdown_month`}
        className={classname}
        required
        title={title}
        defaultValue="default"
        onChange={(e) => {
          vmonth = parseInt(monthList.indexOf(e.target.value));
          setBirthMonth(vmonth);
        }}
      >
        <option value="default" disabled>
          {title}
        </option>
        {monthList.map((i) => (
          <option key={monthList.indexOf(i)} value={i}>
            {i}
          </option>
        ))}
      </select>
    </>
  );
};

export const UseYear = ({ setBirthYear, title, name, classname, id }) => {
  let vyear;
  let yearList = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    yearList.push(i);
  }

  return (
    <>
      <label htmlFor={name} style={{ display: "none" }}></label>
      <select
        name={name}
        id={`${id}_dropdown_year`}
        className={classname}
        required
        title={title}
        defaultValue="default"
        onChange={(e) => {
          vyear = parseInt(e.target.value);
          setBirthYear(vyear);
        }}
      >
        <option value="default" disabled>
          {title}
        </option>
        {yearList.map((i) => (
          <option key={yearList.indexOf(i)} value={i}>
            {i}
          </option>
        ))}
      </select>
    </>
  );
};

// to reset the dropdown options back to default after the respective button is clicked
export const UseResetDate = (id) => {
  const dropdown_day = document.querySelector(`#${id}_dropdown_day`);
  const dropdown_month = document.querySelector(`#${id}_dropdown_month`);
  const dropdown_year = document.querySelector(`#${id}_dropdown_year`);
  dropdown_day.selectedIndex = "0";
  dropdown_month.selectedIndex = "0";
  dropdown_year.selectedIndex = "0";
};
