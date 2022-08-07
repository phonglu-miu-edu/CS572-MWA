import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ResponseModel from '@core/api/response.model';
import { environment } from '@environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {
  }

  getFileUploadUrl = (file: File) => this.http.post<{ url: string }>(`${environment.backendUrl}/files/uploadUrl/${file.name}`, null)
    .pipe(
      map((data) => ({ data: data.url } as ResponseModel)),
      catchError(error => of({ error: error.message } as ResponseModel))
    );

  upload = (url: string, file: File): Observable<any> => {
    debugger
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.put(url, formData);
  };
}
