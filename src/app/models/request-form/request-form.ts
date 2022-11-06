export interface RequestForm {
  subject: string;
  from: string;
  to: string;
  contractDate: Date;
  timeDeparture: string;
  timeArrival: string;
  amount: string;
  quantity: string;
  description: string;
  visible: boolean;
}
