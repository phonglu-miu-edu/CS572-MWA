import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import HorseModel from '@app/modules/admin/horse/horse.model';
import ResponseModel from '@core/api/response.model';
import { environment } from '@environments/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class HorseService {
  constructor(private http: HttpClient) {
  }

  get = (page: number, pageSize: number) => {
    // TODO: pageSize is fix for demo
    return this.http.get<{ horses: HorseModel[] }>(`${environment.backendUrl}/horses/200/${page}`)
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  };

  create = (name: string, description: string, picture: string, breed: string, weight: number) => {
    return this.http.post<{ horse: HorseModel }>(`${environment.backendUrl}/horses`, { name, description, picture, breed, weight })
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  }

  edit = (id: string, name: string, description: string, picture: string, breed: string, weight: number) => {
    return this.http.patch<{ horse: HorseModel }>(`${environment.backendUrl}/horses/${id}`, { name, description, picture, breed, weight })
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  }

  delete = (id: string) => {
    return this.http.delete<{ horse: HorseModel }>(`${environment.backendUrl}/horses/${id}`)
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  }
}
