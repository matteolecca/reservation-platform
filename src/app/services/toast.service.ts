import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast: any;
  constructor(private toastController: ToastController) { }

  async setupToast(message: string, duration = 2000, color = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'top',
      color: color || 'danger',
    });
    return toast;
  }
}
