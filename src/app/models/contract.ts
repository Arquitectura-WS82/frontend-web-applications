import { District, User } from './user';

export interface Contract {
  id: number;
  amount: string;
  description: string;
  streetFrom: string;
  districtFrom: District;
  streetTo: string;
  districtTo: District;
  quantity: string;
  subject: string;
  date: string;
  timeArrival: string;
  timeDeparture: string;
  visible: boolean;
  client: User;
  carrier: User;
  status: Status;
  notification: Notification;
}

export interface Status {
  id: number;
  status: string;
}

export interface Notification {
  id: number;
  readStatus: boolean;
}
