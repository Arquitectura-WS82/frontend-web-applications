export interface Contracts {
  offers: Offer[];
  pending: Offer[];
  history: History[];
}

export interface History {
  from: string;
  to: string;
  date: string;
  client: HistoryClient;
  amount: number;
}

export interface HistoryClient {
  name: string;
  'last-name': string;
}

export interface Offer {
  subject: string;
  from: string;
  to: string;
  date: string;
  time: Time;
  quantity: number;
  client: OfferClient;
  amount: number;
}

export interface OfferClient {
  name: string;
  'last-name': string;
  phone: string;
}

export interface Time {
  departure: string;
  arrival: string;
}
