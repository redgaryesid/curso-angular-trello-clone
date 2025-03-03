import { User } from "./user.model";

export interface Board {
  id: string;
  title: string;
  backgroundColor: 'sky'|'yellow'|'red'|'violet'|'gray'|'green';
  members: User[];
}