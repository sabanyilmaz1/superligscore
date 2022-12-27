import React from "react";

interface RoundProps {
  round: number;
}

export const Round: React.FC<RoundProps> = ({ round }: RoundProps) => {
  return (
    <div className="round">
      <div className="round__title">
        <h1>Matchweek - {round}</h1>
      </div>
    </div>
  );
};
