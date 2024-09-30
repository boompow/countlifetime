import React, { useState, useEffect } from "react";
import ConfettiGenerator from "confetti-js";
// import useDataContext from "../../hooks/useDataContext";

const BirthDayCountDown = ({
  birth_day,
  birth_month,
  birth_year,
  setShowCard,
  id,
  name,
}) => {
  const nameCaseCorrected = name.charAt(0).toUpperCase() + name.slice(1);
  // const { birthDay, birthMonth, birthYear, setShowCard } = useDataContext();

  // const birth_day = birthDay;
  // const birth_month = birthMonth;
  // const birth_year = birthYear;

  const [countDown, setCountDown] = useState(null);
  const [countDownShow, setCountDownShow] = useState(false);

  useEffect(() => {
    // to make the leap year birthday of someone who was born on Feb. 29 of a leap year on March 1 of a non-leap year
    const currentDate = new Date(); // YYYY-MM-DDTHH:MM:SSZ
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    let birthMonth = birth_month;
    let birthDay = birth_day;
    if (
      birth_day === 29 &&
      birth_month === 1 &&
      birth_year % 4 === 0 &&
      currentYear % 4 !== 0
    ) {
      birthDay = 1;
      birthMonth = 2;
    }

    let february = 29 ? currentYear % 4 === 0 : 28;
    const monthList = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0]; // sets the month 1 month forward so as to know the duration of the next month

    if (
      currentMonth === birthMonth &&
      birthDay > 14 &&
      birthDay - currentDay <= 14 &&
      birthDay - currentDay > 0
    ) {
      const dayDiff = birthDay - currentDay;
      setCountDown(dayDiff);

      setCountDownShow(true);
    } else if (
      birthDay <= 14 &&
      birthMonth === currentMonth &&
      currentDay < birthDay
    ) {
      setCountDown(birthDay - currentDay);
      setCountDownShow(true);
    } else if (
      birthDay <= 14 &&
      birthMonth === months[currentMonth] &&
      monthList[currentMonth] - currentDay + birthDay <= 14
    ) {
    } else {
      setCountDown(null);
      setCountDownShow(false);
    }

    //to show the birthday card on the birthday only
    if (birthMonth === currentMonth && birthDay === currentDay) {
      setShowCard(true);
    } else {
      setShowCard(false);
    }
  }, [birth_day, birth_month, birth_year, setShowCard]);

  useEffect(() => {
    const confettiSettings = {
      target: `confetti${id}`,
      size: 3,
      clock: 30,
      max: 150,
      props: ["circle", "square"],
      color: [
        [255, 0, 0],
        [255, 255, 0],
        [0, 0, 255],
      ],
      // start_from_edge: true,
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, [countDownShow, id]);

  return (
    <div
      className="countDownContainer"
      style={{ display: countDownShow ? "flex" : "none" }}
    >
      <div className="counter">
        <canvas className="confetti" id={`confetti${id}`} />
        <div className="textContainer">
          <h3>{countDown}</h3>
          <h3>
            {countDown === 1 ? "Day" : "Days"} 'till {nameCaseCorrected}'s
            Birthday 🎂
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BirthDayCountDown;
