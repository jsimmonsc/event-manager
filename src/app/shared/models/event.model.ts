import {Attendee} from "./attendee.model";

export class Event {
  _id: string;
  name: string;
  description: string;
  date: Date;
  parameters: {
    has_guests: boolean;
    requires_fines: boolean;
    requires_attendance: boolean;
    requires_discipline: boolean;
  };
  attendees: Attendee[];
}
