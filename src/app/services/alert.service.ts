import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AltertService {
  constructor(private alertController: AlertController) { }
  presentAlert(buttons: { text: string; id: string; handler: (id?: number) => void }[]) {
    this.alertController.create({
      cssClass: 'class',
      animated: true,
      header: 'Are you sure',
      subHeader: 'this will be permanent',
      buttons
    }).then((aler) => aler.present());
  }
}
