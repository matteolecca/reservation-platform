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
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Titlolsd',
            body: 'Body notifica',
            iconColor: '#1a2b3c',
            id: new Date().getTime()
          }
        ]
      });
    } catch (error) {
      console.log(error.message, 'ERROR');
    }
  }
  async getPermission(){
    await LocalNotifications.requestPermissions();
  }
}
