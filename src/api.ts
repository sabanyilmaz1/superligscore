const LINKS = "https://v3.football.api-sports.io/";

let myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "540ca978dd56dd68d212db8517dcea3b");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

const requestOptions: RequestInit = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export const getLastRound = async () => {
  const response = await fetch(
    LINKS + "fixtures/rounds?season=2022&league=203&current=true",
    requestOptions
  );
  const data = await response.json();
  return data;
};

export const getFixtures = async (round: number) => {
  const response = await fetch(
    LINKS + `fixtures?season=2022&league=203&round=Regular Season - ${round}`,
    requestOptions
  );
  const data = await response.json();
  return data;
};
