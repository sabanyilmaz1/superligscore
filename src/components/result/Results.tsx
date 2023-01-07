import React, { useState, useEffect } from "react";
import Select from "react-select";

import { FixtureRound } from "../fixture/FixtureRound";
import { FixtureMatch } from "../fixture/FixtureMatch";
import "./Result.css";

import { MatchModel } from "../../models/MatchModel";
import { getFixtures, getLastRound } from "../../api";
import { Loader } from "../loader";

export const Results: React.FC = () => {
  const [matches, setMatches] = useState<MatchModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    { value: roundFilters[3], label: `Matchweek - ${roundFilters[3]}` },
  ];

  useEffect(() => {
    getLastRound().then((res) => {
      setRound(parseInt(res.response[0].split(" ")[3]) - 1);
      const currentRound = parseInt(res.response[0].split(" ")[3]);
      // make an array of number with number : start 1, end currentRound, step 1
      const roundFilters = Array.from(
        { length: currentRound },
        (_, i) => i + 1
      );
      setRoundFilters(roundFilters);
      setIsLoading(false);
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

  console.log(isLoading);

  if (isLoading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  return (
    <div className="results">
      <div className="results__round">
        <FixtureRound round={round} />
        <Select
          className="results__select"
          defaultValue={roundSelected}
          onChange={handleChange}
          options={options}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value.toString()}
        />
      </div>
      <div className="results__match">
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
