import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "./FindStudent.css";
import IntroScreen from "../IntroScreen/IntroScreen";

const FindStudent = () => {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [divisionName, setDivisionName] = useState("");
  const [division, setSelectedDivision] = useState("");
  const [lectureDetails, setLectureDetails] = useState([]);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [timeRange, setTimeRange] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [formHover, setFormHover] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (department && year) {
      fetch(`http://localhost:5000/api/division?department=${department}&year=${year}`)
        .then((res) => res.json())
        .then((data) => {
          setDivisions(data);
          setSelectedDivision("");
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          alert("Failed to fetch divisions");
        });
    }
  }, [department, year]);

  const findClassroom = async () => {
    if (!division) {
      alert("Please select a division");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/classroom?division=${division}`);
      const data = await response.json();

      if (response.ok) {
        if (data.lectureDetails) {
          setLectureDetails(data.lectureDetails);
          setMessage(null);
          setTimeRange("");
        } else {
          setMessage(data.message);
          setLectureDetails([]);
          setTimeRange(data.timeRange || "");
        }
        setDivisionName(data.division || data.divisionName || "");
        setShowModal(true);
      } else {
        alert(data.message || "Server Error");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch classroom data");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findClassroom();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.12 } },
  };

  return (
    <div className={`find-student-container ${formHover ? "blur-background" : ""}`}>
      {showIntro && <IntroScreen text="Student Classroom" />}


      {!showIntro && (
        <>
          <div className="background-image"></div>

          {formHover && <div className="hover-dim-overlay"></div>}

          <div
            className="focus-zone"
            onMouseEnter={() => setFormHover(true)}
            onMouseLeave={() => setFormHover(false)}
          >
            <motion.h1
              className="student-title"
              initial={{ opacity: 0, y: -60, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              Find Student Classroom
            </motion.h1>

            <form className="find-student-form" onSubmit={handleSubmit}>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                <option value="">Select Department</option>
                <option value="Civil">Civil</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Computer">Computer</option>
                <option value="EnTC">E&TC</option>
                <option value="IT">IT</option>
              </select>

              <select value={year} onChange={(e) => setYear(e.target.value)} required>
                <option value="">Select Year</option>
                <option value="FE">FE</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
              </select>

              {divisions.length > 0 && (
                <select value={division} onChange={(e) => setSelectedDivision(e.target.value)} required>
                  <option value="">Select Division</option>
                  {divisions.map((div) => (
                    <option key={div._id} value={div._id}>
                      {div.name}
                    </option>
                  ))}
                </select>
              )}

              <button type="submit">Find Classroom</button>
            </form>
          </div>

          <AnimatePresence>
            {showModal && (
              <motion.div
                className="custom-modal-wrapper"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Modal
                  show
                  onHide={() => setShowModal(false)}
                  centered
                  animation={false}
                  backdrop={true} // ✅ enable backdrop
  keyboard={true} // ✅ allow ESC key

                >
                  <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "26px" }}>
                      {message && message.toLowerCase().includes("break")
                        ? ""
                        : message
                        ? divisionName
                        : "Ongoing Lecture"}
                    </Modal.Title>
                  </Modal.Header>

                  <Modal.Body
                    style={{
                      padding: "25px",
                      maxHeight: "70vh",
                      fontSize: "18px",
                      overflowY: "auto",
                    }}
                  >
                    {message && message.toLowerCase().includes("break") ? (
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "22px", fontWeight: "bold" }}>{message}</p>
                        {timeRange && (
                          <p style={{ fontSize: "18px", color: "#555" }}>{timeRange}</p>
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: "18px", fontFamily: "Arial, sans-serif" }}>
                        <p><strong>{divisionName}</strong> is attending:</p>

                        {lectureDetails.map((lecture, index) => (
                          <div
                            key={index}
                            style={{
                              marginBottom:
                                index === lectureDetails.length - 1 ? "0px" : "15px",
                              paddingBottom:
                                index === lectureDetails.length - 1 ? "0px" : "10px",
                              borderBottom:
                                index === lectureDetails.length - 1
                                  ? "none"
                                  : "1px solid #ccc",
                            }}
                          >
                            <div>
  <strong>{lectureDetails.length > 1 ? `${index + 1}. Subject:` : "Subject:"}</strong> {lecture.subject}
</div>

                            <div><strong>Faculty:</strong> {lecture.faculty || lecture.facultyName}</div>
                            <div><strong>Room:</strong> {lecture.classroom || lecture.classroomName}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default FindStudent;
