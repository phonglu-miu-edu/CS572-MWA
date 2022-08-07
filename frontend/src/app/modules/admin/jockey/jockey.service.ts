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
}
