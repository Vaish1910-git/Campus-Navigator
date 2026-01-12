import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "./CollegeMap.css";
import IntroScreen from "../IntroScreen/IntroScreen";
import "bootstrap/dist/css/bootstrap.min.css";

// Image imports
import principal from "../images/Infrastructure/principal.jpg";
import admin1 from "../images/Infrastructure/admin1.jpg";
import admin2 from "../images/Infrastructure/admin2.jpg";
import canteen1 from "../images/Infrastructure/canteen1.jpg";
import canteen2 from "../images/Infrastructure/canteen2.jpg";
import common1 from "../images/Infrastructure/common1.jpg";
import gym1 from "../images/Infrastructure/gym1.jpg";
import gym2 from "../images/Infrastructure/gym2.jpg";
import hall1 from "../images/Infrastructure/hall1.jpg";
import hall2 from "../images/Infrastructure/hall2.jpg";
import library1 from "../images/Infrastructure/library1.jpg";
import library2 from "../images/Infrastructure/library2.jpg";
import nss1 from "../images/Infrastructure/nss1.jpg";
import nss2 from "../images/Infrastructure/nss2.jpg";
import nss3 from "../images/Infrastructure/nss3.jpg";
import nss4 from "../images/Infrastructure/nss4.jpg";
import server from "../images/Infrastructure/server.jpg";
import stationary from "../images/Infrastructure/stationary.jpg";
import workshop1 from "../images/Infrastructure/workshop1.jpg";
import workshop2 from "../images/Infrastructure/workshop2.jpg";

const hoverClassMap = {
  "Principal Office": "principal-hover",
  "Admin Office": "admin-hover",
  "Exam Department": "exam-hover",
  "Emergency Exit": "emergency-hover",
  "Accounts Department": "accounts-hover",
  "T&P/NSS Cell": "nss-hover",
  "IQAC Cell": "iqac-hover",
  "CAP Center": "cap-hover",
  "HOD Cabins": "hod-hover",
  "Library": "library-hover",
  "Seminar Hall": "seminar-hover",
  "Multi-purpose hall": "largehall-hover",
  "Common Room": "commonroom-hover",
  "Gym": "gym-hover",
  "Ladies Washroom": "ladies-hover",
  "Gents Washroom": "gents-hover",
  "Server Room": "server-hover",
  "Workshop": "workshop-hover",
  "Canteen": "canteen-hover",
  "Stationary Shop": "stationary-hover",
};

// Image map
const locationImages = {
  "Principal Office": [principal],
  "Admin Office": [admin1, admin2],
  "Canteen": [canteen1, canteen2],
  "Common Room": [common1],
  "Gym": [gym1, gym2],
  "Seminar Hall": [hall1, hall2],
  "Library": [library1, library2],
  "T&P/NSS Cell": [nss1, nss2, nss3, nss4],
  "Server Room": [server],
  "Stationary Shop": [stationary],
  "Workshop": [workshop1, workshop2],
};

const CollegeMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500); // match fade animation time in IntroScreen
    return () => clearTimeout(timer);
  }, []);
  
useEffect(() => {
  axios
    .get("http://localhost:5000/api/infrastructure")
    .then((res) => {
      setLocations(res.data);  // set locations from DB
    })
    .catch((err) => {
      console.error("Error fetching infrastructure data:", err);
    });
}, []);

  const handleClick = (location) => {
    setSelectedLocation(location);
    setShowModal(true);
  };

  const boldifyText = (text) => {
    const regex =
      /(Ground Floor|First Floor|Second Floor|Third Floor|Fourth Floor|Fifth Floor|Sixth Floor|Room\s\d+[A-Z]?\/?\d*[A-Z]?|Large multi-purpose hall)/g;
    const lines = text.split("\n");
    const firstLine = lines[0];
    const otherLines = lines.slice(1);
    const formatWithBold = (line) =>
      line
        .split(regex)
        .filter(Boolean)
        .map((part, index) =>
          regex.test(part) ? (
            <strong key={index} style={{ fontWeight: "bold", color: "#022040" }}>
              {part}
            </strong>
          ) : (
            <span key={index}>{part}</span>
          )
        );

    return (
      <>
        {formatWithBold(firstLine)}
        {otherLines.map((line, idx) => (
          <p key={idx} style={{ marginTop: "10px" }}>
            {formatWithBold(line)}
          </p>
        ))}
      </>
    );
  };

  const isRoomList = (arr) =>
    Array.isArray(arr) && arr.every((item) => typeof item === "string" && item.includes(" - "));
  console.log("Locations to render buttons:", locations);
  const selectedItem = locations.find((loc) => loc.name === selectedLocation);

  return (
    <>
      {showIntro && <IntroScreen text="Infrastructure" />}
      {!showIntro && (
        <div className="college-map-container">
          {hoveredButton && <div className="hover-dim-overlay"></div>}
          <motion.h1
            className="map-title"
            initial={{ opacity: 0, y: -60, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            Infrastructure
          </motion.h1>
          <div className={`map ${hoveredButton ? "blur-other" : ""}`}>
  {locations.map((item) => (
    <button
      key={item._id}
      className={`map-button ${hoverClassMap[item.name] || ""} ${hoveredButton === item.name ? "active-hover" : ""}`}
      onClick={() => handleClick(item.name)}
      onMouseEnter={() => setHoveredButton(item.name)}
      onMouseLeave={() => setHoveredButton(null)}
      style={{ zIndex: hoveredButton === item.name ? 20 : 2 }}
    >
      {item.name}
    </button>
  ))}
</div>
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontSize: "30px", fontFamily: "sans-serif" }}>
                {selectedLocation || "Location Info"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
  {selectedItem && (
    <div
      style={{
        fontFamily: "Arial",
        fontSize: "19px",
        color: "#022040",
        textAlign: "left",
      }}
    >
      {/* Show description if available */}
      {selectedItem.description && (
        <>
          {selectedItem.name === "Multi-purpose hall" ? (
            boldifyText(selectedItem.description)
          ) : (
            <>
              {selectedItem.name} is located at {boldifyText(selectedItem.description)}
            </>
          )}
        </>
      )}

      {/* Show room list if present */}
      {Array.isArray(selectedItem.rooms) && selectedItem.rooms.length > 0 ? (
        isRoomList(selectedItem.rooms) ? (
          <>
            {selectedItem.rooms.map((item, index) => {
              const [room, desc] = item.split(" - ");
              return (
                <div key={index} style={{ marginBottom: "5px" }}>
                  <strong style={{ color: "#022040" }}>Room {room}</strong> – {desc}
                </div>
              );
            })}
          </>
        ) : (
          <>
            <p style={{ fontSize: "18px", fontWeight: "400" }}>
              {selectedItem.name} is at multiple locations:
            </p>
            <ul style={{ marginTop: "10px", listStyleType: "disc", paddingLeft: "20px" }}>
              {selectedItem.rooms.map((room, index) => (
                <li key={`room-${index}`}>
                  <strong style={{ color: "#022040" }}>Room {room}</strong>
                </li>
              ))}
            </ul>
          </>
        )
      ) : (
        // Handle fallback (like for Washrooms)
        <>
          {(selectedItem.student?.length > 0 ||
            selectedItem.staff?.length > 0 ||
            selectedItem.disabled?.length > 0) && (
            <>
              <p style={{ fontSize: "18px", fontWeight: "400" }}>
                {selectedItem.name} is located at multiple locations:
              </p>

              {selectedItem.student?.length > 0 && (
                <>
                  <p style={{ marginTop: "10px", fontWeight: "bold" }}>For Students:</p>
                  <ul style={{ paddingLeft: "20px", listStyleType: "disc", marginTop: "5px", marginBottom: "10px" }}>

                    {selectedItem.student.map((room, index) => (
                      <li key={`student-${index}`}>
                        <strong style={{ color: "#022040" }}>Room {room}</strong>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {selectedItem.staff?.length > 0 && (
                <>
                  <p style={{ marginTop: "10px", fontWeight: "bold" }}>For Staff:</p>
                  <ul style={{ paddingLeft: "20px", listStyleType: "disc", marginTop: "5px", marginBottom: "10px" }}>

                    {selectedItem.staff.map((room, index) => (
                      <li key={`staff-${index}`}>
                        <strong style={{ color: "#022040" }}>Room {room}</strong>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {selectedItem.disabled?.length > 0 && (
                <>
                  <p style={{ marginTop: "10px", fontWeight: "bold", color: "#0a3a58" }}>
                    ♿ Disabled Friendly Washroom:
                  </p>
                  <ul style={{ paddingLeft: "20px", listStyleType: "disc", marginTop: "5px", marginBottom: "10px" }}>

                    {selectedItem.disabled.map((room, index) => (
                      <li key={`disabled-${index}`}>
                        <strong style={{ color: "#022040" }}>Room {room}</strong>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </>
      )}

      {/* Images if available */}
      {locationImages[selectedItem.name] && (
        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            justifyItems: "center",
          }}
        >
          {locationImages[selectedItem.name].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${selectedItem.name} ${index + 1}`}
              style={{
                width: "100%",
                maxWidth: "230px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )}
</Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default CollegeMap;
