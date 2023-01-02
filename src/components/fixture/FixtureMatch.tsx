import React from "react";

interface MatchProps {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  date: number;
  homeScore: number | null;
  awayScore: number | null;
  isFinished: boolean;
}

export const FixtureMatch = ({
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  date,
  homeScore,
  awayScore,
  isFinished,
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

  return (
    <div className="match">
      <div className="match__home__team">{homeTeam}</div>
      <img src={homeLogo} alt={homeTeam} className="match__logo" />
      <div className={`${isFinished ? "match__score" : "match__hour"}`}>
        {isFinished ? `${homeScore} - ${awayScore}` : time}
      </div>
      <img src={awayLogo} alt={awayTeam} className="match__logo" />
      <div className="match__away__team">{awayTeam}</div>
      <div className="match__date">
        {day}/{month}/{year}
      </div>
    </div>
  );
};
