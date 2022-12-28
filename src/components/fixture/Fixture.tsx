import React, { useState, useEffect } from "react";
import { Round } from "./Round";
import { Match } from "./Match";
import "./Fixture.css";

import { MatchModel } from "../../models/MatchModel";
import { getFixtures, getLastRound } from "../../api";

export const Fixture: React.FC = () => {
  // get the last round from the API
  // display games
  const [matches, setMatches] = useState<MatchModel[]>([]);
  const [round, setRound] = useState<number>(0);

  useEffect(() => {
    getLastRound().then((res) =>
      setRound(parseInt(res.response[0].split(" ")[3]))
    );
  }, []);

  useEffect(() => {
    // get the matches for the round
    if (round > 0) {
      getFixtures(round).then((res) => {
        setMatches(res.response);
      });
    }
  }, [round]);

  // console.log("lignes match", matches);

  return (
    <div className="fixtures">
      <div className="fixtures__round">
        <Round round={round} />
      </div>
      <div className="fixtures__match">
        {matches
          .sort((a, b) => a.fixture.timestamp - b.fixture.timestamp)
          .map((match: MatchModel) => (
            <Match
              key={match.fixture.id}
              homeTeam={match.teams.home.name}
              awayTeam={match.teams.away.name}
              date={match.fixture.timestamp}
              homeLogo={match.teams.home.logo}
              awayLogo={match.teams.away.logo}
              homeScore={match.goals.home}
              awayScore={match.goals.away}
              isFinished={match.fixture.status.short === "FT"}
            />
          ))}
      </div>
    </div>
  );
};
