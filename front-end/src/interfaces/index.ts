import { UserRole } from 'src/constants/constants';

export interface IUserInfo {
  fullname: string;
  classID: string;
  role: UserRole;
}

export interface IClass {
  name: string;
  description: string;
}

export interface IQuizInfo {
  name: string;
  numberOfQuestion: number;
  description: string;
  classID: string;
  timeLimit: number;
  lastModify: Date;
}
