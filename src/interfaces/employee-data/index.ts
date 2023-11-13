import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EmployeeDataInterface {
  id?: string;
  user_id: string;
  address?: string;
  phone_number?: string;
  date_of_birth?: any;
  gender?: string;
  position?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface EmployeeDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  address?: string;
  phone_number?: string;
  gender?: string;
  position?: string;
}
