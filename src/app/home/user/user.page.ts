import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { StorageService } from 'src/app/services/storage.service';
import { TapService } from 'src/app/services/tap.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User;
  loading: boolean;
  error: boolean;
  constructor(
    private authApiService: AuthApiService,
    private navController: NavController,
    private toastService: ToastService,
    private alertController: AlertController,
    private storageService: StorageService,
    private loadingControllerService: LoadingControllerService,
    private tap: TapService
  ) { }

  ngOnInit() {
    this.getUserData();
  }
  itemTap() {
    this.tap.tapSelect();
  }
  getUserData = async (event?: any) => {
    this.loading = true;
    this.error = false;
    const toast = await this.toastService.setupToast('Error loading user');
    try {
      this.user = await this.authApiService.getUserData().toPromise();
    } catch (error) {
      setTimeout(() => {
        this.error = true;
        toast.present();
      }, 2000);
    }
    finally {
      this.loading = false;
      event?.target?.complete();
    }
  };

  logoutUser = async () => {
    const spinner = await this.loadingControllerService.setupLoadingController('logging tou out...');
    await this.storageService.unset('token');
    spinner.present();
    setTimeout(() => {
      this.navController.navigateRoot('/login');
      spinner.dismiss();
    }, 1000);
  };

  async presentLogoutModal() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Log Out',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          id: 'cancel-button',
        }, {
          text: 'Logout',
          id: 'confirm-button',
          handler: this.logoutUser
        }
      ]
    });
    await alert.present();
  }

}
