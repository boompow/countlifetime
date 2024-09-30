import React from "react";
import { useEffect, useState } from "react";
// import useDataContext from "../../hooks/useDataContext";
// import { ageSVG } from "./images/birthday7.svg";

function Calander({ birth_day, birth_month, birth_year, setAgeYear }) {
  // const { birthDay, birthMonth, birthYear, setAgeYear } = useDataContext();

  // const birth_day = birthDay;
  // const birth_month = birthMonth;
  // const birth_year = birthYear;

  const [totalYear, setTotalYear] = useState(0);
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalWeek, setTotalWeek] = useState(0);
  const [totalDay, setTotalDay] = useState(0);
  const [totalHour, setTotalHour] = useState(0);
  const [totalMinute, setTotalMinute] = useState(0);
  const [totalSecond, setTotalSecond] = useState(0);

  // console.log(ageSVG);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date(); // YYYY-MM-DDTHH:MM:SSZ
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const birthYear = parseInt(birth_year);
      let birthMonth = parseInt(birth_month);
      let birthDay = parseInt(birth_day);
      let totalYear = currentYear - birthYear - 1;
      let totalMonth = 0;
      let totalHour = currentDate.getHours();
      let totalMinute = currentDate.getMinutes();
      let totalSecond = currentDate.getSeconds();

      // // to make the leap year birthday of someone who was born on Feb. 29 of a leap year on March 1 of a non-leap year
      if (
        birthDay === 29 &&
        birthMonth === 1 &&
        birthYear % 4 === 0 &&
        currentYear % 4 !== 0
      ) {
        birthDay = 1; // March 1
        birthMonth = 2;
      }

      //managing the months
      const monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // each month duration starting from January to December in a non-leap year
      let currentMonth_daySummation = 0;
      let birthMonth_daySummation = 0;

      if (
        currentMonth > birthMonth ||
        (currentMonth === birthMonth && currentDay >= birthDay)
      ) {
        totalYear++;
        if (currentMonth > birthMonth) {
          currentMonth_daySummation = currentDay - 1; // -1 because the current day is not completed yet so it should be subtracted
          if (birthMonth === 1 && currentYear % 4 === 0) {
            birthMonth_daySummation = monthList[birthMonth] + 1 - birthDay;
          } else {
            birthMonth_daySummation = monthList[birthMonth] - birthDay;
          }

          if (currentMonth - birthMonth > 1) {
            totalMonth = currentMonth - birthMonth - 1;
          }
        } else if (currentMonth === birthMonth) {
          totalMonth = 0;
          currentMonth_daySummation = currentDay - birthDay - 1;
          birthMonth_daySummation = 0;
          if (currentDay === birthDay) {
            currentMonth_daySummation = 0;
            birthMonth_daySummation = 0;
            totalHour = 0;
            totalMinute = 0;
            totalSecond = 0;
          }
        }
      } else {
        totalMonth = 11 - birthMonth + currentMonth;
        currentMonth_daySummation = currentDay - 1;
        if (birthMonth === 1 && birthYear % 4 === 0) {
          birthMonth_daySummation = monthList[birthMonth] + 1 - birthDay;
        } else {
          birthMonth_daySummation = monthList[birthMonth] - birthDay;
        }
      }

      if (
        birthMonth_daySummation + currentMonth_daySummation >=
        monthList[currentMonth]
      ) {
        totalMonth++;
        currentMonth_daySummation =
          birthMonth_daySummation +
          currentMonth_daySummation -
          monthList[currentMonth];
        birthMonth_daySummation = 0;
      }

      let daySum = birthMonth_daySummation + currentMonth_daySummation;
      let totalWeek = Math.floor(daySum / 7);
      let totalDay = daySum - totalWeek * 7;

      //on page start every unit of time should be zero
      if (!birthDay === "" || !birthMonth === "" || !birthYear === "") {
        totalYear = 0;
        totalMonth = 0;
        totalWeek = 0;
        totalDay = 0;
        totalHour = 0;
        totalMinute = 0;
        totalSecond = 0;
      }

      setTotalYear(totalYear);
      setAgeYear(totalYear);
      setTotalMonth(totalMonth);
      setTotalWeek(totalWeek);
      setTotalDay(totalDay);
      setTotalHour(totalHour);
      setTotalMinute(totalMinute);
      setTotalSecond(totalSecond);
    }, 1000);

    return () => clearInterval(timer);
  }, [birth_day, birth_month, birth_year, setAgeYear]);

  return (
    <div className="mainCalender">
      <span className="text1">Lived For</span>
      <span className="text2">And Counting</span>
      <div className="container">
        <div id="year" className="pack">
          <div className="value">{totalYear}</div>
          <div className="lable">{totalYear === 1 ? "Year" : "Years"}</div>
        </div>
        <div id="month" className="pack">
          <div className="value">{totalMonth}</div>
          <div className="lable">{totalMonth === 1 ? "Month" : "Months"}</div>
        </div>
        <div id="week" className="pack">
          <div className="value">{totalWeek}</div>
          <div className="lable">{totalWeek === 1 ? "Week" : "Weeks"}</div>
        </div>
        <div id="day" className="pack">
          <div className="value">{totalDay}</div>
          <div className="lable">{totalDay === 1 ? "Day" : "Days"}</div>
        </div>
        <div id="hour" className="pack">
          <div className="value">{totalHour}</div>
          <div className="lable">{totalHour === 1 ? "Hour" : "Hours"}</div>
        </div>
        <div id="minute" className="pack">
          <div className="value">{totalMinute}</div>
          <div className="lable">
            {totalMinute === 1 ? "Minute" : "Minutes"}
          </div>
        </div>
        <div id="second" className="pack">
          <div className="value">{totalSecond}</div>
          <div className="lable">
            {totalSecond === 1 ? "Second" : "Seconds"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calander;
