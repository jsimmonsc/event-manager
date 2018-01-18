import {Attendee} from "./attendee.model";

export class Event {

  _id: string;
  name: string;
  description: string;
  date: Date;
  sales: number;
  attendees: Attendee[];

  constructor(event: any) {
    this._id = event._id;
    this.name = event.name;
    this.description = event.description;
    this.date = event.date;
    this.sales = event.sales;
    this.attendees = event.attendees;
  }
}
