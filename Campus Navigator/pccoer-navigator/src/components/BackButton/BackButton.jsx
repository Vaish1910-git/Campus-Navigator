import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  // ⬇️ Now this return is safely after hooks
  if (location.pathname === "/") return null;

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <ArrowLeft size={18} style={{ marginRight: "8px" }} />
      Back
    </button>
  );
};

export default BackButton;
