import { User } from './user';

export interface Vehicle {
  id: number;
  carrier: User;
  photo: string;
  type: string;
  quantity: number;
}
