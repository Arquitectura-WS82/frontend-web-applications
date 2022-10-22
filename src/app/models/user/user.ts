export interface User {

    email: string;
    password: string;
    firstName: string;
    lastName: string;
    region: string;
    birthDate: Date;
    phone: number;
    idCard: number;
    typeofuser: string;
    username: string;
    description: string;
}
export interface driver_ranked{
    driver_name: string;
    photo: string;
    type: string;
    rating: Int16Array;
}