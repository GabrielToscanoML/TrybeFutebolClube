import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teams.service';
import { ITeams } from '../interfaces';

const validateMatchPost = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const teamService = new TeamService();
  const result: ITeams[] = await teamService.getAll();
  const homeTeamExist = result.some((team) => team.id === homeTeamId);
  const awayTeamExist = result.some((team) => team.id === awayTeamId);
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  if (!homeTeamExist || !awayTeamExist) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default validateMatchPost;
