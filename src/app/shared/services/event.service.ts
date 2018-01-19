import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Event} from "../models/event.model";
import {Attendee} from "../models/attendee.model";

const API_URL = environment.apiUrl;

@Injectable()
export class EventService {

  constructor(private http: HttpClient) {
  }

  public getAllEvents(): Observable<Event[]> {
    return this.http.get(API_URL + "/events")
      .map((response: Object[]) => {
        return response.map((event) => new Event(event));
      });
  }

  public getEvent(id: string): Observable<Event> {
    return this.http.get(API_URL + "/events/id/" + id)
      .map(response => new Event(response));
  }

  public getAttendeeFromEvent(id: string, studentNumber: number): Observable<Attendee> {
    return this.http.get<Attendee>(API_URL + "/events/id/" + id + "/" + studentNumber);
  }
}
