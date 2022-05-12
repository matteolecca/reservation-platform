import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor() { }
  async showLocalNotification() {
    console.log('Scheduling notification');
    try {
      const n = await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Titlolsd',
            body: 'Body notifica',
            iconColor: '#1a2b3c',
            id: new Date().getTime()
          }
        ]
      });
      console.log('SCHEDULED');
    } catch (error) {
      console.log(error.message, 'ERROR');
    }
  }
  async getPermission(){
    await LocalNotifications.requestPermissions();
  }
}
