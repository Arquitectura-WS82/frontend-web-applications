import { Time } from '@angular/common';

export interface Contract {
  id: number;
  from: string;
  to: string;
  date: Date;
  time_departure: Time;
  time_arrival: Time;
  amount: number;
  quantity: number;
  subject: string;
  description: string;
  notification_id: number;
  visible: boolean;
  status_contract_id: number;
  user_id: number;
  driver_id: number;
}
