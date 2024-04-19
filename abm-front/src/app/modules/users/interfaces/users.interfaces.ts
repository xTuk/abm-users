export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  cuit: string;
  birthdate: string;
  domicile: string;
  phone: string;
}

export interface PostUser extends Omit<User, 'id'> {}
