import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingControllerService {
  constructor(
    private loadingController: LoadingController,
  ) { }

  async setupLoadingController(message?: string) {
    console.log('LOADING CONTROLLER');
    const spinner = await this.loadingController.create({
      animated: true,
      showBackdrop: true,
      message,
    });
    return spinner;
  }
}
