import React from "react";

interface MatchProps {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  date: number;
}

export const Match = ({
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  date,
}: MatchProps) => {
  // convert timestamp to date
  const dateObj = new Date(date * 1000);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hour = dateObj.getUTCHours() + 1;
  const minutes = dateObj.getUTCMinutes();

  const time =
    (hour > 10 ? hour : `0${hour}`) +
    ":" +
    (minutes > 10 ? minutes : `0${minutes}`);

  console.log("time", time);

  return (
    <div className="match">
      <div className="match__home__team">{homeTeam}</div>
      <img src={homeLogo} alt={homeTeam} className="match__logo" />
      <div className="match__hour">{time}</div>
      <img src={awayLogo} alt={awayTeam} className="match__logo" />
      <div className="match__away__team">{awayTeam}</div>
      <div className="match__date">{date}</div>
    </div>
  );
};
