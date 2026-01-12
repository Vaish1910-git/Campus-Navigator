// src/components/IntroScreen.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./IntroScreen.css";

const IntroScreen = ({ text }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [hideClass, setHideClass] = useState("");

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setHideClass("hidden");
    }, 2400); // Start hiding just before complete fade

    const fullTimer = setTimeout(() => {
      setShowIntro(false); // Remove from DOM
    }, 3000); // Fully remove after 3 seconds

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(fullTimer);
    };
  }, []);

  return (
    <>
      {showIntro && (
        <motion.div
          className={`intro-screen ${hideClass}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          {text}
        </motion.div>
      )}
    </>
  );
};

export default IntroScreen;
