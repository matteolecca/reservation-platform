import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationApiService {

  constructor(private httpClient: HttpClient) { }
  subscribeDevice(deviceToken: string) {
    return this.httpClient.post(`${environment.baseUrl}/notifications/subscribe`, { token: deviceToken });
  }
}
