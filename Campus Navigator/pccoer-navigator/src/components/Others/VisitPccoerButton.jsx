import React from "react";
import webGlobeIcon from "../images/webglobe.png"; // adjust if needed
import "./VisitPccoerButton.css";

const VisitPccoerButton = () => {
  return (
    <a
      href="https://www.pccoer.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="webglobe-link"
    >
      <img src={webGlobeIcon} alt="Visit PCCOER" />
    </a>
  );
};

export default VisitPccoerButton;
