import React, { useState } from "react";
import "./SocialLinks.css";
import instagramIcon from "../images/instagram.png";
import facebookIcon from "../images/facebook.png";
import youtubeIcon from "../images/youtube.png";
import linkedinIcon from "../images/linkedin.png";
import twitterIcon from "../images/twitter.png";

const socialLinks = [
  {
    href: "https://www.instagram.com/pccoerpcet/",
    img: instagramIcon,
    alt: "Instagram",
  },
  {
    href: "https://www.facebook.com/pccoerpune/",
    img: facebookIcon,
    alt: "Facebook",
  },
  {
    href: "https://www.youtube.com/channel/UChJFHByu-xP4ti5O-HSKvFA/",
    img: youtubeIcon,
    alt: "YouTube",
  },
  {
    href: "https://www.linkedin.com/company/pccoer-pcet/",
    img: linkedinIcon,
    alt: "LinkedIn",
  },
  {
    href: "https://twitter.com/Pccoer1990",
    img: twitterIcon,
    alt: "Twitter",
  },
];

const SocialLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="social-links">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-button ${hoveredIndex === index ? "hovered" : ""}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img src={link.img} alt={link.alt} />
          {hoveredIndex === index && <span className="social-label">{link.alt}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
