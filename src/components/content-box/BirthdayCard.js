import React from "react";
import { useRef } from "react";
import { toPng } from "dom-to-image";
import { FiDownload } from "react-icons/fi";
import CardImage from "./CardImage";

const BirthdayCard = ({ showCard, ageYear }) => {
  const domRef = useRef(null);
  const download = async () => {
    const dataUrl = await toPng(domRef.current);
    const link = document.createElement("a");
    link.download = "Happy-Birthday.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div
      className="birthdayCardContainer"
      style={{ display: showCard ? "flex" : "none" }}
    >
      <button title="Download" className="downloadBtn" onClick={download}>
        <FiDownload />
      </button>
      <div className="birthdayCard" ref={domRef}>
        <CardImage ageYear={ageYear} />
      </div>
    </div>
  );
};

export default BirthdayCard;
