import { Injectable } from '@angular/core';
import { TapticEngine } from '@awesome-cordova-plugins/taptic-engine/ngx';

@Injectable({
  providedIn: 'root'
})
export class TapService {

  constructor(private tap: TapticEngine) { }
  tapSuccess(){
    this.tap.notification({type: 'success'});
  }
  tapError(){
    this.tap.notification({type: 'error'});
  }
  tapWarning(){
    this.tap.notification({type: 'warning'});
  }
  tapSelect(){
    this.tap.selection();
  }
}
