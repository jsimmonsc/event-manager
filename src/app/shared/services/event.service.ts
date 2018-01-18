import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Event} from "../models/event.model";

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
    return this.http.get(API_URL + "/events/" + id)
      .map(response => new Event(response));
  }
}
