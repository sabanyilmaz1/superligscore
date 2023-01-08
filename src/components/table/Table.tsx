import React, { useEffect, useState } from "react";
import { getTable } from "../../api";
import { TeamTableModel } from "../../models/TeamTableModel";
import "./Table.css";

export const Table = () => {
  const [table, setTable] = useState<TeamTableModel[]>([]);

  useEffect(() => {
    getTable().then((res) => {
      setTable(res.response[0].league.standings[0]);
    });
  }, []);

  return (
    <div className="table">
      <div className="table__header">Super Lig - 2022/2023</div>
      <div className="table__grid">
        <div className="table__grid__header">
          <div className="table__grid__pos">Pos</div>
          <div className="table__grid__logoDiv"></div>
          <div className="table__grid__club">Club</div>
          <div className="table__grid__stat">Played</div>
          <div className="table__grid__stat">Won</div>
          <div className="table__grid__stat">Drawn</div>
          <div className="table__grid__stat">Lost</div>
          <div className="table__grid__stat">GF</div>
          <div className="table__grid__stat">GA</div>
          <div className="table__grid__stat">GD</div>
          <div className="table__grid__points">Points</div>
          <div className="table__grid__form">Form</div>
        </div>
        {table.map((team) => (
          <div className="table__grid__body">
            <div className="table__grid__pos">{team.rank}</div>

            <img
              src={team.team.logo}
              alt="logo"
              className="table__grid__logo"
            />

            <div className="table__grid__club">{team.team.name}</div>
            <div className="table__grid__stat">{team.all.played}</div>
            <div className="table__grid__stat">{team.all.win}</div>
            <div className="table__grid__stat">{team.all.draw}</div>
            <div className="table__grid__stat">{team.all.lose}</div>
            <div className="table__grid__stat">{team.all.goals.for}</div>
            <div className="table__grid__stat">{team.all.goals.against}</div>
            <div className="table__grid__stat">{team.goalsDiff}</div>
            <div className="table__grid__points">{team.points}</div>
            <div className="table__grid__form">{team.form}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
