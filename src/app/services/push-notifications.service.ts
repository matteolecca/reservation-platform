import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { NavController } from '@ionic/angular';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor(
    private notificationService: NotificationService,
    private navController: NavController,
  ) { }
  requestPermission() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
        this.setupListeners();
      } else {
        console.log('unable to set listeners');
      }
    });
  }
  setupListeners() {
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
        this.notificationService.subscribeDevice(token.value);
      }
    );
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
      }
    );
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        this.navController.navigateRoot('/home/bookings');
      }
    );
  }
}
