export interface IUser {
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: false;
  blocked: false;
  role: string;
  fullname: string;
  bio: string;
  tokenVersion: number;
  expiredAt: string;
  telegramId: number;
  firstname: string;
  lastname: string;
  score: number;
  dailyScore: number;
  bestScore: number;
  created_by: string;
  updated_by: string;
}
