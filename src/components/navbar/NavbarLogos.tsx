import React, { useEffect, useState } from "react";
import { teams } from "../../data/teams";
import "./NavbarLogos.css";

export const NavbarLogos: React.FC = () => {
  return (
    <div>
      {teams[0].map((team) => (
        <img className="logo" src={team.team.logo} alt="" />
      ))}
    </div>
  );
};
