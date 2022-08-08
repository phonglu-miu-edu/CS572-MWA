import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class SharedService {
  openWindow (url: string) {
    window.open(url, '_blank');
  }
}
