import React, { useState } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import pccoerLogo from "../images/pccoer-logo.png";
import VisitPccoerButton from "../Others/VisitPccoerButton";
import SocialLinks from "../Others/SocialLinks";
import pcetLogo from "../images/pcet.png";


const LandingPage = () => {
  const navigate = useNavigate();
  const [showCredits, setShowCredits] = useState(false);

  return (
    <div className="landing-container">
      <video autoPlay muted loop className="bg-video">
        <source src="/videos/pccoer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    
    <div className="scrolling-banner">
  <div className="scrolling-text">
    An Autonomous Institute | NBA Accredited (4 UG Programs) | NAAC A++ Accredited | An ISO 21001:2018 Certified 
    (Approved by Govt. of Maharashtra, Affiliated to SPPU, Approved by AICTE, DTE CODE - 6822)
  </div>
</div>

      <div className="overlay"></div>
      <div className="content">
  <img
    className="pcet-logo"
    src={pcetLogo}
    alt="PCET Logo"
    height={80}
    style={{ marginBottom: "10px" }}
  />
  <p className="subtitle">PCET's</p>
  <h1 className="title">
    Pimpri Chinchwad College of Engineering and Research
  </h1>
  <img
    className="logo"
    src={pccoerLogo}
    alt="PCCOER Logo"
    height={110}
    width={110}
  />
  <button
    className="navigate-button"
    onClick={() => navigate("/search")}
  >
    NAVIGATE CAMPUS
  </button>
</div>


<div className="visit-links-container">
  <VisitPccoerButton />
  <SocialLinks />
</div>

      <button className="credits-button" onClick={() => setShowCredits(true)}>
        Meet the Team
      </button>

      <Modal show={showCredits} onHide={() => setShowCredits(false)}   centered   dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>PBL Project Developers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
            <p style={{ fontSize: "21px" }}><strong>Project Title:</strong> College Information Digital Panel for Visitor's Guide</p>
            <p style={{ fontSize: "20px" }}><strong>Guide Allotted:</strong> Dr. Abhijit D. Jadhav</p>
            <p style={{ fontSize: "18px" }}><strong>Domain:</strong> Product Development</p>
            <div style={{ marginTop: "15px" }}>
  <strong style={{ fontSize: "20px" }}>Team Members:</strong>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      marginTop: "10px",
      fontSize: "17px", // 👈 Increase font size only here
    }}
  >
    <div style={{ display: "flex", justifyContent: "start" }}>
  <span style={{ width: "400px" }}><strong>Vaishnavi Deshmukh</strong></span>
  <span>SECOA40</span>
</div>
    <div style={{ display: "flex", justifyContent: "start" }}>
      <span style={{ width: "400px" }}><strong>Trupti Dikkar</strong></span>
      <span>SECOA48</span>
    </div>
    <div style={{ display: "flex", justifyContent: "start" }}>
      <span style={{ width: "400px" }}><strong>Hemashree Jawdekar</strong></span>
      <span>SECOB29</span>
    </div>
    <div style={{ display: "flex", justifyContent: "start" }}>
      <span style={{ width: "400px" }}><strong>Mayuri Yenare</strong></span>
      <span>SECOA68</span>
    </div>
    <div style={{ display: "flex", justifyContent: "start" }}>
      <span style={{ width: "400px" }}><strong>Vrushali Dhakane</strong></span>
      <span>SECOA42</span>
    </div>
    
   <div style={{ marginTop: "10px", fontSize: "17px", textAlign: "center" }}>
  <span style={{ display: "block" }}>and</span>
  <span style={{ display: "block", fontWeight: "bold" }}>Bhaskar Shenoy</span>
</div>

  </div>
</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCredits(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LandingPage;
