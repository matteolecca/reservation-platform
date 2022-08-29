import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NavController } from '@ionic/angular';
import { BIOMETHRIC_NOT_ENROLLED } from '../utils/errorCodes';
import { Capacitor } from '@capacitor/core';

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
      if(Capacitor.isNativePlatform()){
        const biomethric = await this.faio.isAvailable();
        if(biomethric){
          await this.faio.show({
            title: 'AUTH FACE ID'
          });
        }
      }
      await this.authService.checkToken();
    } catch (error) {
      const {code} = error;
      if(code === BIOMETHRIC_NOT_ENROLLED){
        return await this.authService.checkToken();
      }
      this.navController.navigateRoot('/login');
    }
  };
}
