import { Contract } from './contract';
import { User } from './user';

export interface Comment {
  id: number;
  contract: Contract;
  client: User;
  stars: number;
  comment: string;
}
