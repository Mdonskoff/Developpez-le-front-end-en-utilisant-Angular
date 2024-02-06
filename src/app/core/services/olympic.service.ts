import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => { //erreur dans le résultat de la requête (json mal formaté)
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return throwError(() => this.errorService.setMessageError());
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable().pipe(
      catchError((error) => {
        return throwError(() =>  error.message)
      }))
  }

}
