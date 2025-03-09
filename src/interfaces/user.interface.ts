import { Auth } from './auth.interface';

export interface User extends Auth {
  id?: number; 
  name: string;
  createdAt?: Date; 
  updatedAt?: Date;  
}