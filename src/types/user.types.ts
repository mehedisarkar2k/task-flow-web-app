import { Role } from './auth.types';

export interface User {
  id: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  role: Role;
  theme?: string;
  image?: string | null;
  jobTitle?: string | null;
  department?: string | null;
  location?: string | null;
  bio?: string | null;
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
}
