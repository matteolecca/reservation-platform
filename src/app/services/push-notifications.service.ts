import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { NavController } from '@ionic/angular';
import { AltertService } from './alert.service';
import { NotificationService } from './notification.service';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor(
    private notificationService: NotificationService,
    private alertService: AltertService,
    private navController: NavController,
  ) { }
  requestPermission() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
        this.setupListeners();
      } else {
        // Show some error
      }
    });
  }
  setupListeners() {
    console.log('SETING UP LISTENERS');
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
        this.notificationService.subscribeDevice(token.value);
      }
    );
    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        this.alertService.presentNotificationAlert(notification.title, notification.body);
        // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        this.navController.navigateRoot('/home/bookings');
      }
    );
  }
}
