import { Geolocation } from '@capacitor/geolocation';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { Site } from './types';
import { DomSanitizer } from '@angular/platform-browser';
import { IonHeader } from '@ionic/angular';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  @ViewChild(IonHeader) header: any;
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  marker: Marker;
  sitename: string;
  vicinity: string;
  sites: Site[];
  filteredSites: Site[];
  suggShowed = false;
  mapUrl: any;
  filterValue: string;
  headerHeight: number;
  constructor(
    private locationApi: AuthApiService,
    private loadingController: LoadingControllerService,
    private sanitizer: DomSanitizer
  ) { }
  async ionViewDidEnter() {
    this.headerHeight = this.header.el.offsetHeight;
    // if (!this.mapUrl) {
      await this.loadNearSite();
      await this.loadSites();
    // }
  }
  triggerSuggestions(trigger?: boolean, event?: any) {
    if (event) {
      return true;
    }
    this.suggShowed = trigger;
  }
  setMapSite(url: string,) {
    if (!url) {
      return;
    }
    // eslint-disable-next-line max-len
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${url}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
  }
  filter() {
    this.filteredSites = this.sites.filter((site) => site.siteName.toLowerCase().includes(this.filterValue.toLowerCase()));
  }
  async siteClicked(id: number) {
    this.suggShowed = false;
    const { coords: { x, y } } = this.sites.find((site) => site.id === id);
    this.loadNearSite(null, { x, y });
    this.filterValue = '';
  }
  async loadSites() {
    try {
      this.sites = this.filteredSites = await this.locationApi.getSites().toPromise();
    } catch (error) {
      console.error(error.message);
    }
  }
  async loadNearSite(event?: any, siteCoords?: any) {
    this.suggShowed = false;
    const lc = await this.loadingController.setupLoadingController('Map Loading...');
    lc.present();
    try {
      const result = await Geolocation.requestPermissions();
      console.log(result);
      const { coords } = await Geolocation.getCurrentPosition();
      const coordinates = { lat: siteCoords ? siteCoords.x : coords.latitude, lng: siteCoords ? siteCoords.y : coords.longitude };
      const { name, vicinity, url } = await this.locationApi.getLocation(coordinates).toPromise();
      this.sitename = name;
      this.vicinity = vicinity;
      this.setMapSite(url);
    } catch (error) {
      console.log(error);
    }
    finally {
      lc.dismiss();
      event?.target.complete();
    }
  }
  openMaps() {
    window.open(`https://www.google.com/maps?q=spindox+${this.vicinity}+maps`);
  }
}
