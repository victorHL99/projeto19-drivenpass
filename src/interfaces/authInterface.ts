export interface IAuthUser {
  id: number;
  email:string;
  password:string;
}

export type CreateAuthUser = Omit<IAuthUser, 'id'>;
