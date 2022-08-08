import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob';
import ResponseModel from '@core/api/response.model';
import AzureBlobFileModel from '@core/file/file.model';
import { environment } from '@environments/environment';
import { catchError, map, Observable, of, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {
  }

  getFileUploadSchema = (file: File) => this.http.post<AzureBlobFileModel>(`${environment.backendUrl}/files/uploadUrl/${file.name}`, null)
    .pipe(
      map((data) => ({ data } as ResponseModel)),
      catchError(error => of({ error: error.message } as ResponseModel))
    );

  upload = (fileUploadSchema: AzureBlobFileModel, file: File): Observable<any> => {
    return new Observable(observer => {
      const blobServiceClient = new BlobServiceClient(fileUploadSchema.sasUrl);
      const containerClient = blobServiceClient.getContainerClient(fileUploadSchema.uploadContainer);
      const blockBlobClient = containerClient.getBlockBlobClient(fileUploadSchema.filename);

      blockBlobClient
        .uploadData(file)
        .then(
          this.onUploadComplete(observer, file),
          this.onUploadError(observer)
        );
    });
  };

  private onUploadError(observer: Subscriber<number>) {
    return (error: any) => observer.error(error);
  }

  private onUploadComplete(observer: Subscriber<number>, file: File) {
    return () => {
      observer.next(file.size);
      observer.complete();
    };
  }
}
