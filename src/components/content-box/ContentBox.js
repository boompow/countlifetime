import React from "react";
import Calander from "./Calander";
import BirthDayCountDown from "./BirthDayCountDown";
import Input from "./Input";
import BirthdayCard from "./BirthdayCard";
import Quotes from "./Quotes";
import "../../style/ContentBox.css";
import { useState } from "react";
import { BottomAdPlaceholder, SideAdPlaceholder } from "./AdPlaceholder";

const ContentBox = ({ value }) => {
  const [birthDay, setBirthDay] = useState(value.day ? value.day : 0);
  const [birthMonth, setBirthMonth] = useState(value.month ? value.month : 0);
  const [birthYear, setBirthYear] = useState(value.year ? value.year : 0);
  const [showCard, setShowCard] = useState(false);
  const [ageYear, setAgeYear] = useState(0);
  const [name, setName] = useState(value.name ? value.name : "unknown");

  const odd_id = value.id % 2 !== 0; //to display side ads only on odd id values

  return (
    <div className="Main">
      <div className="Main_container1">
        <div className="mainContainer">
          <Input
            birthDay={birthDay}
            birthMonth={birthMonth}
            birthYear={birthYear}
            name={name}
            setName={setName}
            setBirthDay={setBirthDay}
            setBirthMonth={setBirthMonth}
            setBirthYear={setBirthYear}
            id={value.id}
            isUser={value.isUser}
          />
          <BirthDayCountDown
            birth_day={birthDay}
            birth_month={birthMonth}
            birth_year={birthYear}
            setShowCard={setShowCard}
            id={value.id}
            name={name}
          />
          <Calander
            birth_day={birthDay}
            birth_month={birthMonth}
            birth_year={birthYear}
            setAgeYear={setAgeYear}
          />
          <BirthdayCard showCard={showCard} ageYear={ageYear} />
          <Quotes />
          <BottomAdPlaceholder odd_id={odd_id} id={value.id} />
        </div>
      </div>
      <div className="sideAd_container">
        <SideAdPlaceholder odd_id={odd_id} id={value.id} />
      </div>
    </div>
  );
};

export default ContentBox;
