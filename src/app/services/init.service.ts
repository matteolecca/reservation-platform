import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NavController } from '@ionic/angular';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private authService: AuthService,
    private faio: FingerprintAIO,
    private navController: NavController,
    private locationService: LocationService
  ) { }
  init = async () => {
    try {
      await this.locationService.printCurrentPosition();
      const biomethric = await this.faio.isAvailable();
      if(biomethric && false){
        await this.faio.show({
          title: 'AUTH FACE ID'
        });
      }
      await this.authService.checkToken();
    } catch (error) {
      console.log(error.message);
      console.log('NO FACE ID FOUND');
      this.navController.navigateRoot('/login');
    }
  };
}
