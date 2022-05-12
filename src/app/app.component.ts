import { Component, OnInit } from '@angular/core';
import { BackgroundService } from './services/background.service';
import { PushNotificationsService } from './services/push-notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
  ) { }
  async ngOnInit() {
  }
}
