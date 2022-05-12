import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from '../services/push-notifications.service';
import { TapService } from '../services/tap.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private tap: TapService) { }

  ngOnInit() {
  }
  vibrate() {
    this.tap.tapSelect();
  }

}
