import { Injectable } from '@angular/core';
import { NotificationApiService } from '../api/notification-api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notificationApiService: NotificationApiService) { }

  subscribeDevice = async (deviceToken: string)=>{
    console.log('TOKEN DEVICE', deviceToken);
    try {
      const result = await this.notificationApiService.subscribeDevice(deviceToken).toPromise();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
}
