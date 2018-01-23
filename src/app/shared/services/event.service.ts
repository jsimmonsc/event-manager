import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  public getEvent(eventID: string): Observable<Event> {
    return this.http.get(API_URL + "/events/id/" + eventID)
      .map(response => new Event(response));
  }

  public getAttendeeFromEvent(eventID: string, studentNumber: number): Observable<Attendee> {
    return this.http.get<Attendee>(API_URL + "/events/id/" + eventID + "/" + studentNumber);
  }

  public updateAttendee(eventID: string, attendee: Attendee) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put(API_URL + '/events/id/' + eventID + '/' + attendee._id, attendee, {headers: headers});
  }
}
