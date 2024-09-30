import React from "react";
import useDataContext from "../hooks/useDataContext";
import "../style/LoadingAnimation.css";
// import { MdCancel } from "react-icons/md";

const LoadingAnimation = () => {
  const { isLoading } = useDataContext();
  return (
    <div
      style={{
        display: isLoading ? "flex" : "none",
      }}
      className="loadAnimation"
    >
      {/* <div
        title="Cancel"
        className="loading_cancel"
        onClick={(e) => {
          e.preventDefault();
          setIsLoading(false);
        }}
      >
        <MdCancel />
      </div> */}
      <div className="loadContainer">
        <div className="loadContainer_border"></div>
        <div className="loadContainer_logo">
          {/* <img src={require("../images/countlifetimeThick.png")} alt="logo" /> */}
          <img
            src="https://i.ibb.co/2y87hgV/countlifetime-Thick.png"
            alt="countlifetime-Thick"
            border="0"
            width="55%"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
