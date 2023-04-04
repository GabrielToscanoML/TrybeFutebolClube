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
  goalsBalance: 0,
  efficiency: 0.0,
};
const resetObj = ():void => {
  obj.totalPoints = 0;
  obj.totalGames = 0;
  obj.totalVictories = 0;
  obj.totalDraws = 0;
  obj.totalLosses = 0;
  obj.goalsFavor = 0;
  obj.goalsOwn = 0;
  obj.goalsBalance = 0;
  obj.efficiency = 0.0;
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

const calculateMatchesDataHome = (data: IMatch[]): ILeaderBoard => {
  resetObj();
  data.forEach((match) => {
    const TP = calculateTotalPoints(match.homeTeamGoals, match.awayTeamGoals);
    obj.totalPoints += TP;
    obj.totalGames += 1;
    if (TP === 3) obj.totalVictories += 1;
    if (TP === 1) obj.totalDraws += 1;
    if (TP === 0) obj.totalLosses += 1;
    obj.goalsFavor += match.homeTeamGoals;
    obj.goalsOwn += match.awayTeamGoals;
  });
  return obj;
};

const calculateMatchesDataAway = (data: IMatch[]): ILeaderBoard => {
  resetObj();
  data.forEach((match) => {
    const TP = calculateTotalPoints(match.awayTeamGoals, match.homeTeamGoals);
    obj.totalPoints += TP;
    obj.totalGames += 1;
    if (TP === 3) obj.totalVictories += 1;
    if (TP === 1) obj.totalDraws += 1;
    if (TP === 0) obj.totalLosses += 1;
    obj.goalsFavor += match.awayTeamGoals;
    obj.goalsOwn += match.homeTeamGoals;
  });
  return obj;
};

const calculateGoalsAndEfficiency = (data: ILeaderBoard): object => {
  const result = { goalsBalance: 0, efficiency: 0.0 };
  result.goalsBalance = (data.goalsFavor - data.goalsOwn);
  result.efficiency = parseFloat(((data.totalPoints / (data.totalGames * 3)) * 100).toFixed(2));
  return result;
};

const teamMatchesHome = async (team: ITeams): Promise<ILeaderBoard> => {
  const matches = <IMatch[]> await finishedMatches();
  const matchesFilter: IMatch[] = matches.filter((match: IMatch) => (match.homeTeamId === team.id));
  const calculateResult = calculateMatchesDataHome(matchesFilter);
  const goalsAndEfficiency = calculateGoalsAndEfficiency(calculateResult);
  const result = <ILeaderBoard>{
    name: team.teamName,
    ...calculateResult,
    ...goalsAndEfficiency,
  };
  return result;
};

const teamMatchesAway = async (team: ITeams): Promise<ILeaderBoard> => {
  const matches = <IMatch[]> await finishedMatches();
  const matchesFilter: IMatch[] = matches.filter((match: IMatch) => (match.awayTeamId === team.id));
  const calculateResult = calculateMatchesDataAway(matchesFilter);
  const goalsAndEfficiency = calculateGoalsAndEfficiency(calculateResult);
  const result = <ILeaderBoard>{
    name: team.teamName,
    ...calculateResult,
    ...goalsAndEfficiency,
  };
  return result;
};

const leaderBoardResult = async (data: 'home' | 'away'): Promise<ILeaderBoard[]> => {
  const teams = await allTeams();

  if (data === 'home') {
    const result: ILeaderBoard[] = await Promise.all(
      teams.map((team: ITeams) => teamMatchesHome(team)),
    );
    return result;
  }
  const result: ILeaderBoard[] = await Promise.all(
    teams.map((team: ITeams) => teamMatchesAway(team)),
  );
  return result;
};

export const sortLeaderBoard = (leaderboard: ILeaderBoard[]) => {
  const result = leaderboard.sort(
    (teamA, teamB) =>
      (teamB.totalPoints - teamA.totalPoints)
      || (teamB.totalVictories - teamA.totalVictories)
      || (teamB.goalsBalance - teamA.goalsBalance)
      || (teamB.goalsFavor - teamA.goalsFavor),
  );
  return result;
};

export default leaderBoardResult;
