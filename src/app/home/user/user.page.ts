import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { TapService } from 'src/app/services/tap.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private toastService: ToastService,
    private alertController: AlertController,
    private authService: AuthService,
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
          handler: this.authService.logout
        }
      ]
    });
    await alert.present();
  }

}
