export interface UserInterface {
  id: number | string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  memInfo: Date;
  srcImg?: string;
  description?: string;
}
