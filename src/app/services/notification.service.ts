import { Injectable } from '@angular/core';
import { NotificationApiService } from '../api/notification-api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private notificationApiService: NotificationApiService) { }
  subscribeDevice = async (deviceToken: string)=>{
    try {
      await this.notificationApiService.subscribeDevice(deviceToken).toPromise();
    } catch (error) {
      console.log(error);
    }
  };
}
