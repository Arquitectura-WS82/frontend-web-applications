export interface User {
  name: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  region: string;
  birthdate: Date;
  description: string;
  password: string;
  photo: string;
}

export interface driver_ranked {
  driver_name: string;
  photo: string;
  type: string;
  rating: Int16Array;
}
