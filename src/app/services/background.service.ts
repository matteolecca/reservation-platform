import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  constructor() {

  }
  listen() {
    App.addListener('appStateChange', state => {
      console.log('Status changed', state);
    });
  }
}
