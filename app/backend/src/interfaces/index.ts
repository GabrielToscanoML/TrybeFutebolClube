export interface ITeams {
  id?: number;
  teamName: string;
}

export interface IUser {
  id: number;
  username: string;
  role?: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
