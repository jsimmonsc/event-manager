import {Attendee} from "./attendee.model";

export class Event {
  _id: string;
  name: string;
  description: string;
  date: Date;
  sales: number;
  attendees: Attendee[];
}
