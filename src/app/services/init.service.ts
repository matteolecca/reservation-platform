import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private authService: AuthService,
    private faio: FingerprintAIO,
    private navController: NavController,
  ) { }
  init = async () => {
    try {
      const biomethric = await this.faio.isAvailable();
      await this.faio.show({
        title: 'AUTH FACE ID'
      });
      await this.authService.checkToken();
    } catch (error) {
      console.log('NO FACE ID FOUND');
      this.navController.navigateRoot('/login');
    }
  };
}
