import React, { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import "./RefreshButton.css"; // Optional if you want to style it

const RefreshButton = () => {
  useEffect(() => {
    const handleR = (event) => {
      if (event.key === "r" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        window.location.reload();
      }
    };

    window.addEventListener("keydown", handleR);
    return () => window.removeEventListener("keydown", handleR);
  }, []);

  return (
    <button className="refresh-button" onClick={() => window.location.reload()}>
      <RotateCcw size={18} style={{ marginRight: "8px" }} />
      Refresh
    </button>
  );
};

export default RefreshButton;
