import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import JockeyModel from '@app/modules/admin/jockey/jockey.model';
import ResponseModel from '@core/api/response.model';
import { environment } from '@environments/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class JockeyService {
  constructor(private http: HttpClient) {
  }

  get = (page: number, pageSize: number) => {
    return this.http.get<{ jockeys: JockeyModel[] }>(`${environment.backendUrl}/jockeys/${pageSize}/${page}`)
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  };

  create = (name: string, description: string, picture: string) => {
    return this.http.post<{ jockey: JockeyModel }>(`${environment.backendUrl}/jockeys`, { name, description, picture })
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  }

  edit = (id: string, name: string, description: string, picture: string) => {
    return this.http.patch<{ jockey: JockeyModel }>(`${environment.backendUrl}/jockeys/${id}`, { name, description, picture })
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  }

  delete = (id: string) => {
    return this.http.delete<{ jockey: JockeyModel }>(`${environment.backendUrl}/jockeys/${id}`)
      .pipe(
        map((data) => ({ data } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
  }
}
