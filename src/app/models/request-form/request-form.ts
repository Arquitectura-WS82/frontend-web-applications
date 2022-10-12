export interface RequestForm {
    driver_id: number;
    client_id: number;
    from: string;
    to: string;
    date: string;
    quantity: number;
    time_departure: string;
    time_arrival: string;
    amount: number;
    description: string;
    subject: string;
}
