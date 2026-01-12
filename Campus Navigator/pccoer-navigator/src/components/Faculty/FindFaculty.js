import React, { useState, useEffect } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import "./FindFaculty.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import IntroScreen from "../IntroScreen/IntroScreen";

// ✅ Static imports
import abhijit_jadhav from "../images/faculty/Comp/abhijit_jadhav.jpg";
import amiya_tripathi from "../images/faculty/Comp/amiya_tripathi.jpg";
import archana_chaugule from "../images/faculty/Comp/archana_chaugule.png";
import archana_kollu from "../images/faculty/Comp/archana_kollu.png";
import ashwini_bhavsar from "../images/faculty/Comp/ashwini_bhavsar.png";
import avani_ray from "../images/faculty/Comp/avani_ray.jpg";
import deepa_mahajan from "../images/faculty/Comp/deepa_mahajan.png";
import dinesh_anantwar from "../images/faculty/Comp/dinesh_anantwar.png";
import dipti_chaudhari from "../images/faculty/Comp/dipti_chaudhari.jpg";
import govind_suryawanshi from "../images/faculty/Comp/govind_suryawanshi.jpg";
import madhavi_khapre from "../images/faculty/Comp/madhavi_khapre.jpg";
import madhuri_kumbhar from "../images/faculty/Comp/madhuri_kumbhar.jpeg";
import madhuri_badole from "../images/faculty/Comp/madhuri_badole.png";
import mahendra_salunkhe from "../images/faculty/Comp/mahendra_salunkhe.png";
import minal_bodke from "../images/faculty/Comp/minal_bodke.png";
import nilam_jadhav from "../images/faculty/Comp/nilam_jadhav.jpg";
import priyadarshini_doke from "../images/faculty/Comp/priyadarshini_doke.jpg";
import rachana_mudholkar from "../images/faculty/Comp/rachana_mudholkar.jpg";
import rutuja_magar from "../images/faculty/Comp/rutuja_magar.png";
import shailaja_lohar from "../images/faculty/Comp/shailaja_lohar.jpg";
import shivganga_gavhane from "../images/faculty/Comp/shivganga_gavhane.jpg";
import shraddha_kalsekar from "../images/faculty/Comp/shraddha_kalsekar.jpg";
import shrinika_inamdar from "../images/faculty/Comp/shrinika_inamdar.jpg";
import shrutika_menkudale from "../images/faculty/Comp/shrutika_menkudale.jpg";
import sonali_lunawat from "../images/faculty/Comp/sonali_lunawat.png";
import swati_nikam from "../images/faculty/Comp/swati_nikam.png";
import swati_rajput from "../images/faculty/Comp/swati_rajput.jpg";
import tejaswini_patil from "../images/faculty/Comp/tejaswini_patil.jpg";
import tejaswini_gavhane from "../images/faculty/Comp/tejaswini_gavhane.png";
import trupti_kherde from "../images/faculty/Comp/trupti_kherde.png";
import tushar_kute from "../images/faculty/Comp/tushar_kute.png";
import vaishali_kulloli from "../images/faculty/Comp/vaishali_kulloli.jpg";
import vaishali_latke from "../images/faculty/Comp/vaishali_latke.png";
import vijay_kotkar from "../images/faculty/Comp/vijay_kotkar.jpg";
import yogeshwari_mahajan from "../images/faculty/Comp/yogeshwari_mahajan.jpg";
import jyoti_pai from "../images/faculty/Comp/jyoti_pai.jpg";
import madhavi_potdar from "../images/faculty/Comp/madhavi_potdar.png";
import sachin_varpe from "../images/faculty/Comp/sachin_varpe.png";
import jitendra_nawale from "../images/faculty/jitendra_nawale.png";
import kiran_landge from "../images/faculty/kiran_landge.png";
import abhijeet_karmalkar from "../images/faculty/abhijeet_karmalkar.png";
import ganesh_admane from "../images/faculty/ganesh_admane.png";
import sudarshan_kalbhor from "../images/faculty/sudarshan_kalbhor.png";
import saurabh_chavan from "../images/faculty/saurabh_chavan.png";
import snehal_patil from "../images/faculty/snehal_patil.png";  
import bhagyashree_bhosale from "../images/faculty/bhagyashree_bhosale.png";
import majahar_maniyar from "../images/faculty/majahar_maniyar.png";
import santoshkumar_chobe from "../images/faculty/IT/santoshkumar_chobe.png";
import trupti_tekale from "../images/faculty/IT/trupti_tekale.png";
import bhavana_bhadane from "../images/faculty/IT/bhavana_bhadane.png";
import divya_punwantwar from "../images/faculty/IT/divya_punwantwar.png";
import hemlata_gaikwad from "../images/faculty/IT/hemlata_gaikwad.png";
import priyanka_patil from "../images/faculty/IT/priyanka_patil.png";
import shilpa_pandey from "../images/faculty/IT/shilpa_pandey.png";
import rupali_shishupal from "../images/faculty/IT/rupali_shishupal.png";
import rahul_mapari from "../images/faculty/EnTC/rahul_mapari.png";
import snehal_gholap from "../images/faculty/EnTC/snehal_gholap.png";
import santosh_randive from "../images/faculty/EnTC/santosh_randive.png"; 
import dipali_shende from "../images/faculty/EnTC/dipali_shende.png";
import kiran_napte from "../images/faculty/EnTC/kiran_napte.png";
import kishore_bhangale from "../images/faculty/EnTC/kishore_bhangale.png"; 
import vijayalaxmi_kumbhar from "../images/faculty/EnTC/vijayalaxmi_kumbhar.png";
import maithili_andhare from "../images/faculty/EnTC/maithili_andhare.png";
import aarti_tekade from "../images/faculty/EnTC/aarti_tekade.png";
import rupali_kawade from "../images/faculty/EnTC/rupali_kawade.png";
import priti_kale from "../images/faculty/EnTC/priti_kale.png";
import bhagyashree_gawali from "../images/faculty/EnTC/bhagyashree_gawali.png";
import mrunmayee_rahate from "../images/faculty/EnTC/mrunmayee_rahate.png";
import mayur_garade from "../images/faculty/EnTC/mayur_garade.png";
import dipali_dhake from "../images/faculty/EnTC/dipali_dhake.png";
import krushna_bhalekar from "../images/faculty/EnTC/krushna_bhalekar.png";
import akshay_rahane from "../images/faculty/Civil/akshay_rahane.png";
import amar_shitole from "../images/faculty/Civil/amar_shitole.png";
import anand_kudoli from "../images/faculty/Civil/anand_kudoli.png";
import arun_dhawale from "../images/faculty/Civil/arun_dhawale.png";
import chetan_chavan from "../images/faculty/Civil/chetan_chavan.png";
import dipeeka_firake from "../images/faculty/Civil/dipeeka_firake.png";
import mayura_yeole from "../images/faculty/Civil/mayura_yeole.png";
import pranali_patil from "../images/faculty/Civil/pranali_patil.png";
import rahul_patil from "../images/faculty/Civil/rahul_patil.png";
import sahil_salvi from "../images/faculty/Civil/sahil_salvi.png";
import sameer_sawarkar from "../images/faculty/Civil/sameer_sawarkar.png";
import satish_pitake from "../images/faculty/Civil/satish_pitake.png";
import sudarshan_bobade from "../images/faculty/Civil/sudarshan_bobade.png";
import achyut_khare from "../images/faculty/Mech/achyut_khare.png";
import dipak_biradar from "../images/faculty/Mech/dipak_biradar.png";
import ganesh_fodase from "../images/faculty/Mech/ganesh_fodase.png";
import gulab_siraskar from "../images/faculty/Mech/gulab_siraskar.png";
import jayashri_chopade from "../images/faculty/Mech/jayashri_chopade.png";
import pradeep_gaikwad from "../images/faculty/Mech/pradeep_gaikwad.png";
import prasad_shinde from "../images/faculty/Mech/prasad_shinde.png";
import prashant_mahale from "../images/faculty/Mech/prashant_mahale.png";
import rahul_bawane from "../images/faculty/Mech/rahul_bawane.png";
import ramesh_rathod from "../images/faculty/Mech/ramesh_rathod.png";
import rupali_patil from "../images/faculty/Mech/rupali_patil.png";
import sanjay_narayankar from "../images/faculty/Mech/sanjay_narayankar.png";
import sham_mankar from "../images/faculty/Mech/sham_mankar.png";
import sujit_chaudhari from "../images/faculty/Mech/sujit_chaudhari.png";
import sukhadip_chaugule from "../images/faculty/Mech/sukhadip_chaugule.png";
import vijay_desai from "../images/faculty/Mech/vijay_desai.png";
import tushar_gaikwad from "../images/faculty/FE/tushar_gaikwad.png";
import rupeshkumar_patil from "../images/faculty/FE/rupeshkumar_patil.png";
import manisha_deshpande from "../images/faculty/FE/manisha_deshpande.png";
import shital_patil from "../images/faculty/FE/shital_patil.png";
import mahesh_sarada from "../images/faculty/FE/mahesh_sarada.png";
import priya_oghe from "../images/faculty/FE/priya_oghe.png";
import deepshikha_shrivastava from "../images/faculty/FE/deepshikha_shrivastava.png";
import sandeep_borgaonkar from "../images/faculty/FE/sandeep_borgaonkar.png";
import priti_ghutepatil from "../images/faculty/FE/priti_ghutepatil.png";
import rupaali_patil from "../images/faculty/FE/rupaali_patil.png";
import nilesh_thube from "../images/faculty/FE/nilesh_thube.png";
import gajanan_jadhav from "../images/faculty/FE/gajanan_jadhav.png";
import amita_patilrode from "../images/faculty/FE/amita_patilrode.png";
import trupti_patil from "../images/faculty/FE/trupti_patil.png";
import prachi_nilekar from "../images/faculty/FE/prachi_nilekar.png";
import ramdas_jare from "../images/faculty/FE/ramdas_jare.png";
import vijaya_yaduvanshi from "../images/faculty/EnTC/vijaya_yaduvanshi.png";
import priti_rajput from "../images/faculty/EnTC/priti_rajput.png";
import harshali_badhan from "../images/faculty/FE/harshali_badhan.png";
import kunda_raul from "../images/faculty/FE/kunda_raul.png";
import shivaji_chavan from "../images/faculty/FE/shivaji_chavan.png";
import mukta_patil from "../images/faculty/Comp/mukta_patil.png";
import dipali_kirange from "../images/faculty/Comp/dipali_kirange.png";
import pratik_chopade from "../images/faculty/Comp/pratik_chopade.png";

const facultyPhotos = {
  abhijit_jadhav, amiya_tripathi, archana_chaugule, archana_kollu,   ashwini_bhavsar, avani_ray, deepa_mahajan, dinesh_anantwar,
  dipti_chaudhari, govind_suryawanshi, madhavi_khapre, madhuri_kumbhar,   madhuri_badole, mahendra_salunkhe, minal_bodke, nilam_jadhav,
  priyadarshini_doke, rachana_mudholkar, rutuja_magar, shailaja_lohar,  shivganga_gavhane, shraddha_kalsekar, shrinika_inamdar, shrutika_menkudale,
  sonali_lunawat, swati_nikam, swati_rajput, tejaswini_patil, tejaswini_gavhane,  trupti_kherde, tushar_kute, vaishali_kulloli, vaishali_latke,
  vijay_kotkar, yogeshwari_mahajan, jyoti_pai, madhavi_potdar, sachin_varpe, jitendra_nawale, kiran_landge, abhijeet_karmalkar, ganesh_admane, 
  sudarshan_kalbhor, saurabh_chavan, snehal_patil, bhagyashree_bhosale, majahar_maniyar, santoshkumar_chobe, trupti_tekale, bhavana_bhadane, divya_punwantwar, hemlata_gaikwad, priyanka_patil, shilpa_pandey, rupali_shishupal,
  santosh_randive, rahul_mapari, dipali_shende, kiran_napte, kishore_bhangale, vijayalaxmi_kumbhar, maithili_andhare, aarti_tekade, rupali_kawade, priti_kale, mrunmayee_rahate, mayur_garade,
  akshay_rahane, amar_shitole, anand_kudoli, arun_dhawale, chetan_chavan, dipeeka_firake, mayura_yeole, pranali_patil, rahul_patil, sahil_salvi, sameer_sawarkar, satish_pitake, sudarshan_bobade,
  achyut_khare, dipak_biradar, ganesh_fodase, gulab_siraskar, jayashri_chopade, pradeep_gaikwad, prasad_shinde, prashant_mahale, rahul_bawane, ramesh_rathod, rupaali_patil, sanjay_narayankar, sham_mankar, sujit_chaudhari, sukhadip_chaugule, vijay_desai,
  tushar_gaikwad, rupeshkumar_patil, manisha_deshpande, shital_patil, mahesh_sarada, priya_oghe, deepshikha_shrivastava, sandeep_borgaonkar, priti_ghutepatil,
  rupali_patil, nilesh_thube, gajanan_jadhav, trupti_patil, prachi_nilekar, ramdas_jare, vijaya_yaduvanshi, priti_rajput, harshali_badhan, kunda_raul, shivaji_chavan, mukta_patil, dipali_kirange, pratik_chopade,
  snehal_gholap, bhagyashree_gawali, amita_patilrode, dipali_dhake, krushna_bhalekar
};

// ✅ List of faculty who have a PDF in public/pdfs/
const facultyWithPDF = new Set([
  "akshay_rahane", "amar_shitole", "anand_kudoli", "arun_dhawale", "mayura_yeole", "rahul_patil", "sahil_salvi", "sameer_sawarkar", "satish_pitake", "sudarshan_bobade",
  "archana_chaugule", "avani_ray", "govind_suryawanshi", "jyoti_pai", "madhavi_khapre", "madhuri_badole", "madhuri_kumbhar", "mahendra_salunkhe", "minal_bodke", "nilam_jadhav",
  "prachi_nilekar", "pratik_chopade", "priyadarshini_doke", "rachana_mudholkar", "rutuja_magar", "sachin_varpe", "shailaja_lohar", "shivganga_gavhane", "shraddha_kalsekar",
  "shrutika_menkudale", "sonali_lunawat", "swati_nikam", "swati_rajput", "tejaswini_gavhane", "tejaswini_patil", "trupti_kherde", "vaishali_kulloli", "vaishali_latke",
  "vijay_kotkar",  "aarti_tekade", "dipali_dhake", "dipali_shende", "kiran_napte", "kishore_bhangale", "maithili_andhare", "mrunmayee_rahate", "priti_kale", "priti_rajput", "rahul_mapari",
  "rupali_kawade", "santosh_randive", "vijayalaxmi_kumbhar", "vijaya_yaduvanshi",   "amita_patilrode", "deepshikha_shrivastava", "gajanan_jadhav", "kunda_raul", "mahesh_sarada", "manisha_deshpande",
   "nilesh_thube", "priti_ghutepatil", "priya_oghe", "ramdas_jare",   "rupaali_patil", "rupeshkumar_patil", "sandeep_borgaonkar", "shital_patil", "shivaji_chavan", "trupti_patil", "tushar_gaikwad",
  "rupali_shishupal",  "achyut_khare", "dipak_biradar", "ganesh_fodase", "gulab_siraskar", "jayashri_chopade", "pradeep_gaikwad", "prasad_shinde", "prashant_mahale", "rahul_bawane", "ramesh_rathod",
  "rupali_patil", "sanjay_narayankar", "sham_mankar", "sujit_chaudhari", "sukhadip_chaugule", "vijay_desai"
]);


const excludedFaculty = new Set([
  "abhijeet karmalkar",   "ganesh admane",  "sudarshan kalbhor",  "saurabh chavan",  "snehal patil",  "bhagyashree bhosale",
  "majahar maniyar",  "kiran landge",  "jitendra nawale",
]);

const FindFaculty = () => {
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [cabin, setCabin] = useState(null);
  const [classroom, setClassroom] = useState(null);
  const [facultyName, setFacultyName] = useState("");
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hoveringForm, setHoveringForm] = useState(false);
  
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
    fetch(`http://localhost:5000/api/faculty?department=${department}`)
      .then((res) => res.json())
      .then((data) => {
        setFaculties(data);
        setFaculty("");
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Failed to fetch faculties");
      });
  }
}, [department]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department) return alert("Please select a department");

    try {
      const res = await fetch(`http://localhost:5000/api/findfaculty?faculty=${faculty}`);
      const data = await res.json();

      if (res.ok) {
        setFacultyName(data.name || data.cabin?.name || "Faculty");

        if (data.classroom) {
          setClassroom(data.classroom);
          setCabin(null);
          setMessage(null);
        } else if (data.message) {
          setCabin(data.cabin);
          setMessage(data.message);
          setClassroom(null);
        } else if (data.cabin) {
          setCabin(data.cabin);
          setMessage(null);
          setClassroom(null);
        }
        setShowModal(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to fetch faculty location");
    }
  };

  const getPhoto = (name) => {
    if (!name) return null;

    const clean = name
      .replace(/^(dr\.|prof\.|mr\.|mrs\.|ms\.)\s*/i, "") // ✅ remove all titles
      .replace(/\./g, "")
      .trim()
      .toLowerCase();

    const parts = clean.split(/\s+/);
    const key = parts.length >= 2 ? `${parts[0]}_${parts[parts.length - 1]}` : parts[0];
    return facultyPhotos[key] || null;
  };

  const getPdfLink = (name) => {
  if (!name) return null;

  // Remove any titles like Mr., Ms., etc.
  let cleanName = name
    .toLowerCase()
    .replace(/^(dr\.|prof\.|mr\.|mrs\.|ms\.)\s*/i, "")
    .trim()
    .replace(/\s+/g, "_");

  return facultyWithPDF.has(cleanName)
    ? `/pdfs/${cleanName}.pdf`
    : null;
};


  return (
    <>
      {/* 🔥 Intro Animation */}
      {showIntro && <IntroScreen text="Faculty Location" />}
      {/* 🧾 Main Content */}
      {!showIntro && (
        <div className={`find-faculty-container ${hoveringForm ? "blur-active" : ""}`}>
          <div className="background-layer"></div>

          {showTitle && (
            <motion.h1
              className="faculty-title"
              initial={{ opacity: 0, y: -70, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Find Faculty Cabin
            </motion.h1>
          )}

          {showForm && (
            <motion.form
              className="find-faculty-form"
              onSubmit={handleSubmit}
              onMouseEnter={() => setHoveringForm(true)}
              onMouseLeave={() => setHoveringForm(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                <option value="">Select Department</option>
                <option value="Computer">Computer</option>
                <option value="Mechanical">Mechanical</option>
                <option value="IT">IT</option>
                <option value="EnTC">E&TC</option>
                <option value="Civil">Civil</option>
                <option value="Lab Assistant">Lab Assistant</option>
                <option value="System Admin">System Admin</option>
                <option value="Peon">Peon</option>
                <option value="First Year">First Year</option>
              </select>

              {faculties.length > 0 && (
                <select value={faculty} onChange={(e) => setFaculty(e.target.value)} required>
                  <option value="">Select Faculty</option>
                  {faculties.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              )}

              <button type="submit" className="submit">Find Cabin</button>
            </motion.form>
          )}
        </div>
      )}

      {/* 🪟 Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{message ? facultyName : classroom ? "Ongoing Lecture" : facultyName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {getPhoto(facultyName) && (
            <div className="faculty-photo-wrapper">
              <Image
                src={getPhoto(facultyName)}
                alt={facultyName}
                fluid
                rounded
                className="faculty-photo"
              />
            </div>
          )}

          {getPdfLink(facultyName) && (
  <a
    href={getPdfLink(facultyName)}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      marginTop: "15px",
      marginBottom: "15px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "6px",
      fontWeight: "600",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
      transition: "background-color 0.3s ease",
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
  >
    View Info PDF
  </a>
)}


          {(() => {
            if (message === "Not available at this time") {
              return (
                <div style={{ fontSize: "19px", color: "red", fontWeight: "bold" }}>
                  {facultyName} is unavailable (outside college hours).
                </div>
              );
            }

            if (classroom) {
              return (
                <div style={{ fontSize: "19px", color: "#022040", fontWeight: "bold" }}>
                  {facultyName} is taking <strong>{classroom.subject}</strong> lecture from{" "}
                  <strong>{classroom.start}</strong> to <strong>{classroom.end}</strong> in{" "}
                  <strong>{classroom.floor} - Room {classroom.room}</strong>.
                </div>
              );
            }

            if (cabin && !message) {
              return (
                <div style={{ fontSize: "19px", color: "green", fontWeight: "bold" }}>
      {/* Only show this line if faculty is not in excluded list */}
                  {!excludedFaculty.has(facultyName.toLowerCase()) && (
                    <>
                      {facultyName} is free and available.<br />
                    </>
                 )}
                 Seated at <strong>{cabin.floor} - Cabin {cabin.cabin}</strong>.
               </div>
            );  
          }

            if (message) {
              return (
                <div>
                  <p style={{ fontWeight: "bold", color: "#022040" }}>
                    Cabin: {cabin?.cabin} ({cabin?.floor})
                  </p>
                  <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
                </div>
              );
            }

            return (
              <div style={{ fontSize: "19px", color: "red", fontWeight: "bold" }}>
                {facultyName}'s data is not available.
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

export default FindFaculty;
