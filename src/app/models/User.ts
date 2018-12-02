export interface User {
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  uid?: string;
  directions?: string[];
  deleted?: boolean;
}
