export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface UserOutput {
  id: string;
  firstName: string;
  secondName: string;
  password: string;
  email: string;
} 

export interface UserLogin {
  password: string;
  email: string;
}