import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavbarLogos } from "./NavbarLogos";
import { FaBars } from "react-icons/fa";

import superlig from "../../assets/superlig.svg";

export const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [largeur, setLargeur] = useState<number>(window.innerWidth);

  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setLargeur(window.innerWidth);

      if (window.innerWidth > 900) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [largeur]);

  return (
    <div className="navbar">
      <div className="navbar__left">
        <img src={superlig} alt="superlig" />
      </div>
      <div className="navbar__right">
        <div className="navbar__right__logos">
          <h4>Club sites</h4>
          <NavbarLogos />
        </div>
        <button className="navbar__button" onClick={toggleNavSmallScreen}>
          <FaBars />
        </button>
        <div className="navbar__right__links">
          <nav>
            {(toggleMenu || largeur > 900) && (
              <ul className="navbar__right__link-list">
                <li className="navbar__right__link-item">Home</li>
                <li className="navbar__right__link-item">Fixtures</li>
                <li className="navbar__right__link-item">Results</li>
                <li className="navbar__right__link-item">Table</li>
                <li className="navbar__right__link-item">Clubs</li>
                <li className="navbar__right__link-item">Players</li>
                <li className="navbar__right__link-item">Managers</li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};
