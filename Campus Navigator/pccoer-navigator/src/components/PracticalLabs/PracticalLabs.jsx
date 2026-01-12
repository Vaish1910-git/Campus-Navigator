import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./PracticalLabs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import IntroScreen from "../IntroScreen/IntroScreen";

const PracticalLabs = () => {
  const [department, setDepartment] = useState("");
  const [labs, setLabs] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedLabIndex, setSelectedLabIndex] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hoveringForm, setHoveringForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setShowTitle(true);
      setShowForm(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (department) {
      fetch(`http://localhost:5000/api/labs?department=${department}`)
        .then((res) => res.json())
        .then((data) => {
          setLabs(data || []);
          console.log("🔍 Labs fetched:", data);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          alert("Failed to fetch labs");
        });
    }
  }, [department]);

  return (
    <>
      {showIntro && <IntroScreen text="Practical Labs" />}

      {!showIntro && (
        <div className={`practical-labs-container ${hoveringForm ? "blur-active" : ""}`}>
          <div className="background-layer"></div>

          {showTitle && (
            <motion.h1
              className="labs-title"
              initial={{ opacity: 0, y: -70, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
               Practical Labs
            </motion.h1>
          )}

          {showForm && (
            <motion.form
              className="labs-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedLabIndex !== "") setShowModal(true);
              }}
              onMouseEnter={() => setHoveringForm(true)}
              onMouseLeave={() => setHoveringForm(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Dropdown 1: Department */}
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setSelectedLabIndex("");
                }}
                required
              >
                <option value="">Select Department</option>
                <option value="Computer">Computer</option>
                <option value="Mechanical">Mechanical</option>
                
                <option value="EnTC">EnTC</option>
                <option value="Civil">Civil</option>
              </select>

              {/* Dropdown 2: Lab (only if labs exist) */}
              {labs.length > 0 && (
                <select
                  value={selectedLabIndex}
                  onChange={(e) => setSelectedLabIndex(e.target.value)}
                  required
                >
                  <option value="">Select Lab</option>
                  {labs.map((lab, idx) => (
                    <option key={idx} value={idx}>
                      {lab.name}
                    </option>
                  ))}
                </select>
              )}

              {/* Button to trigger modal */}
              <Button
                variant="success"
                className="find-lab-button"
                onClick={() => {
                  if (department && selectedLabIndex !== "") {
                    setShowModal(true);
                  } else {
                    alert("Please select both department and lab");
                  }
                }}
                style={{ marginTop: "15px" }}
              >
                Find Lab
              </Button>
            </motion.form>
          )}
        </div>
      )}

      {/* Modal for Lab Info */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{department} Department Labs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(() => {
            if (selectedLabIndex === "") {
              return (
                <div style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>
                  No lab selected.
                </div>
              );
            }

            const lab = labs[selectedLabIndex];
            if (!lab) {
              return (
                <div style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>
                  Lab data not found.
                </div>
              );
            }

            return (
              <div className="lab-details">
                <p><strong>Name:</strong> {lab.name}</p>
                <p><strong>Department:</strong> {department}</p>
                <p><strong>Room:</strong> {lab.room || "N/A"}</p>
                <p><strong>Floor:</strong> {lab.floor || "N/A"}</p>
              </div>
            );
          })()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PracticalLabs;
