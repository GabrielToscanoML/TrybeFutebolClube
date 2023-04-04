import TeamService from '../services/teams.service';
import { ILeaderBoard, IMatch, ITeams } from '../interfaces';
import MatchService from '../services/match.service';

const obj = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};
// Pego todas as partidas que foram finalizadas
const finishedMatches = async (): Promise<void | IMatch[]> => {
  const matchesObj = new MatchService();
  const matches = await matchesObj.getAll();
  return matches.filter((match) => match.inProgress === false);
};

// Pego todos os times
const allTeams = async () => {
  const teamsObj = new TeamService();
  const teams = await teamsObj.getAll();
  return teams;
};

const calculateTotalPoints = (home: number, away: number) => {
  if (home > away) return 3;
  if (home === away) return 1;
  return 0;
};

const calculateMatchesData = (data: IMatch[]): ILeaderBoard => {
  const objDefault = obj;
  data.forEach((match) => {
    const TP = calculateTotalPoints(match.homeTeamGoals, match.awayTeamGoals);
    objDefault.totalPoints += TP;
    objDefault.totalGames += 1;
    if (TP === 3) objDefault.totalVictories += 1;
    if (TP === 1) objDefault.totalDraws += 1;
    if (TP === 0) objDefault.totalLosses += 1;
    objDefault.goalsFavor += match.homeTeamGoals;
    objDefault.goalsOwn += match.awayTeamGoals;
  });
  return objDefault;
};

const calculateGoalsAndEfficiency = (data: ILeaderBoard): object => {
  const result = { goalsBalance: 0, efficiency: 0.0 };
  result.goalsBalance = (data.goalsFavor - data.goalsOwn);
  result.efficiency = parseFloat(((data.totalPoints / (data.totalGames * 3)) * 100).toFixed(2));
  return result;
};

const teamMatches = async (team: ITeams): Promise<ILeaderBoard> => {
  const matches = <IMatch[]> await finishedMatches();
  const matchesFilter: IMatch[] = matches.filter((match: IMatch) => (match.homeTeamId === team.id));
  const calculateResult = calculateMatchesData(matchesFilter);
  const goalsAndEfficiency = calculateGoalsAndEfficiency(calculateResult);
  const result = <ILeaderBoard>{
    name: team.teamName,
    ...calculateResult,
    ...goalsAndEfficiency,
  };
  return result;
};

const leaderBoardResult = async (): Promise<ILeaderBoard[]> => {
  const teams = await allTeams();

  const result: ILeaderBoard[] = await Promise.all(
    teams.map((team: ITeams) => teamMatches(team)),
  );
  return result;
};

export default leaderBoardResult;
