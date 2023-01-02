import React, { useState, useEffect } from "react";
import Select from "react-select";

import { FixtureRound } from "./FixtureRound";
import { FixtureMatch } from "./FixtureMatch";
import "./Fixture.css";

import { MatchModel } from "../../models/MatchModel";
import { getFixtures, getLastRound } from "../../api";

export const Fixture: React.FC = () => {
  const [matches, setMatches] = useState<MatchModel[]>([]);
  const [round, setRound] = useState<number>(0);
  const [roundFilters, setRoundFilters] = useState<number[]>([]);
  const [roundSelected, setRoundSelected] = useState<OptionType | null>(null);

  type OptionType = {
    value: number;
    label: string;
  };

  const options: OptionType[] = [
    { value: roundFilters[0], label: `Matchweek - ${roundFilters[0]}` },
    { value: roundFilters[1], label: `Matchweek - ${roundFilters[1]}` },
    { value: roundFilters[2], label: `Matchweek - ${roundFilters[2]}` },
  ];

  useEffect(() => {
    getLastRound().then((res) => {
      setRound(parseInt(res.response[0].split(" ")[3]));
      const round1 = parseInt(res.response[0].split(" ")[3]);
      setRoundFilters([round1, round1 + 1, round1 + 2]);
      console.log("res", res);
    });
  }, []);

  useEffect(() => {
    // get the matches for the round
    if (round > 0) {
      getFixtures(round).then((res) => {
        setMatches(res.response);
      });
    }
  }, [round]);

  const handleChange: any = (option: OptionType) => {
    setRoundSelected(option);
    setRound(option.value);
  };

  return (
    <div className="fixtures">
      <div className="fixtures__round">
        <FixtureRound round={round} />
        <Select
          className="fixtures__select"
          defaultValue={roundSelected}
          onChange={handleChange}
          options={options}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value.toString()}
        />
      </div>
      <div className="fixtures__match">
        {matches &&
          matches
            .sort((a, b) => a.fixture.timestamp - b.fixture.timestamp)
            .map((match: MatchModel) => (
              <FixtureMatch
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
