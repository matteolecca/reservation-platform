import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TapticEngine } from '@awesome-cordova-plugins/taptic-engine/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './api/interceptors/interceptor.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { InitService } from './services/init.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
const initApp = (appInitService: InitService) => (): Promise<any> => appInitService.init();
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    TapticEngine,
    FingerprintAIO,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: APP_INITIALIZER, useFactory: initApp, multi: true, deps: [InitService] }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
