import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavbarLogos } from "./NavbarLogos";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import superlig from "../../assets/superlig.svg";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline;
  position: relative;
  cursor: pointer;
  font-family: "Quicksand";
  font-weight: 500;
  font-size: 20px;
  color: rgba(231, 73, 73, 0.56);
  :hover {
    color: #e74949;
    font-weight: 700;
  }
`;

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
                <li>
                  <StyledLink className="navbar__right__link-item" to="/">
                    Fixtures
                  </StyledLink>
                </li>
                <li>
                  <StyledLink
                    className="navbar__right__link-item"
                    to="/results"
                  >
                    Results
                  </StyledLink>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};
