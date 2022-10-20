export interface OfferContract {
  id: number;
  driverId: number;
  clientId: number;
  subject: string;
  from: string;
  to: string;
  date: string;
  timeDeparture: string;
  timeArrival: string;
  quantity: number;
  amount: number;
  status: string;
}
