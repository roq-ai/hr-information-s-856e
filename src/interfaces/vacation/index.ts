import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VacationInterface {
  id?: string;
  user_id: string;
  start_date?: any;
  end_date?: any;
  reason?: string;
  status?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface VacationGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  reason?: string;
  status?: string;
}
