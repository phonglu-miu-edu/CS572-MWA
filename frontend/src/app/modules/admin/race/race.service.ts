import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import HorseModel from '@app/modules/admin/horse/horse.model';
import RaceModel from '@app/modules/admin/race/race.model';
import ResponseModel from '@core/api/response.model';
import { environment } from '@environments/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class RaceService {
  constructor(private http: HttpClient) {
  }

  get = (page: number, pageSize: number) => {
    // TODO: pageSize is fix for demo
    return this.http.get<{ races: RaceModel[] }>(`${environment.backendUrl}/races/200/${page}`)
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  };

  create = (start: Date, closed: boolean, horses: HorseModel[]) => {
    return this.http.post<{ race: RaceModel }>(`${environment.backendUrl}/races`, { start: start.toUTCString(), closed, horses })
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  }

  edit = (id: string, start: Date, closed: boolean, horses: HorseModel[]) => {
    return this.http.patch<{ race: RaceModel }>(`${environment.backendUrl}/races/${id}`, { start: start.toUTCString(), closed, horses })
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  }

  delete = (id: string) => {
    return this.http.delete<{ race: RaceModel }>(`${environment.backendUrl}/races/${id}`)
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  }
}
