import {Guest} from "./guest.model";

export interface Attendee {
  _id: number;
  first_name: string;
  last_name: string;
  student_number: number;
  grade_level: number;
  guest: Guest;
  guestId: number;
  timestamp: string;
}
