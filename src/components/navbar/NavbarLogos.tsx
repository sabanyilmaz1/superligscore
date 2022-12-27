import React, { useEffect, useState } from "react";
import { teams } from "../../data/teams";
import "./NavbarLogos.css";

export const NavbarLogos: React.FC = () => {
  return (
    <div>
      {teams[0].map((team) => (
        <a key={team.team.id} href={team.team.site} target="blank">
          <img className="logo" src={team.team.logo} alt="" />
        </a>
      ))}
    </div>
  );
};
