export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  birthdate: string;
  description: any;
  photoUrl: any;
  phone: string;
  type: string;
  district: District;
  street: string;
  stars: number;
}

export interface District {
  id: string;
  name: string;
  province: Province;
}

export interface Province {
  id: string;
  name: string;
  department: Department;
}

export interface Department {
  id: string;
  name: string;
}
