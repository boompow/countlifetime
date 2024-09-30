import React from "react";
import "../../style/PageComponent.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return <div className="footer">COUNTLIFETIME &copy; {year}</div>;
};

export default Footer;
