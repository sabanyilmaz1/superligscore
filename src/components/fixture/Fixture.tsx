import React, { useState, useEffect } from "react";
import { Round } from "./Round";
import { Match } from "./Match";
import "./Fixture.css";

import { MatchFixture } from "../models/MatchFixture";
import { getFixtures, getLastRound } from "../../api";

export const Fixture: React.FC = () => {
  // get the last round from the API
  // display games
  const [matches, setMatches] = useState<any>([]);
  const [round, setRound] = useState<number>(0);

  useEffect(() => {
    getLastRound().then((res) =>
      setRound(parseInt(res.response[0].split(" ")[3]))
    );
  }, []);

  useEffect(() => {
    // get the matches for the round
    if (round > 0) {
      console.log(
        getFixtures(round).then((res) => {
          // console.log(res.response);
          setMatches(res.response);
        })
      );
    }
  }, [round]);

  console.log("lignes match", matches);

  return (
    <div className="fixtures">
      <div className="fixtures__round">
        <Round round={round} />
        <div className="fixtures__match">
          {matches.map((match: any) => (
            <Match
              key={match.fixture.id}
              homeTeam={match.teams.home.name}
              awayTeam={match.teams.away.name}
              date={match.fixture.timestamp}
              homeLogo={match.teams.home.logo}
              awayLogo={match.teams.away.logo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
