import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { AuthApiService } from '../api/auth-api.service';
import { LoadingControllerService } from './loading-controller.service';
import { PushNotificationsService } from './push-notifications.service';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authService: AuthApiService,
    private storageService: StorageService,
    private navController: NavController,
    private loadingController: LoadingControllerService,
    private pushService: PushNotificationsService,
    private toastService: ToastService
  ) { }

  checkToken = async () => {
    const spinner = await this.loadingController.setupLoadingController('Checking in..');
    const toastError = await this.toastService.setupToast('No connection', 2000);
    spinner.present();
    const token = await this.storageService.get('token');
    if (!token) {
      this.navController.navigateRoot('/login');
    }
    else {
      try {
        const isValidToken = await this.authService.validateToken(token).toPromise();
        if (!isValidToken) {
          return this.navController.navigateRoot('/login');
        }
        if(Capacitor.isNativePlatform()){
        this.pushService.requestPermission();
        }
        this.navController.navigateRoot('/home/bookings');
      } catch (error) {
        if(!error.status){
          toastError.present();
        }
        else{
          this.storageService.unset('token');
        }
        this.navController.navigateRoot('/login');
      }
    }
    spinner.dismiss();
  };

  logout = async () => {
    const spinner = await this.loadingController.setupLoadingController('logging you out...');
    await this.storageService.unset('token');
    spinner.present();
    setTimeout(() => {
      this.navController.navigateRoot('/login');
      spinner.dismiss();
    }, 1000);
  };
}
