import { Injectable } from '@angular/core';
// import { Geolocation } from '@capacitor/geolocation';
// import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  // options: NativeGeocoderOptions = {
  //   useLocale: true,
  //   maxResults: 5
  // };

  constructor(
  ) { }
  printCurrentPosition = async () => {
    // const { coords } = await Geolocation.getCurrentPosition();
    // this.nativeGeocoder.reverseGeocode(coords.latitude, coords.longitude, this.options)
    //   .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
    //   .catch((error: any) => console.log(error));
    // eslint-disable-next-line max-len
  };
}
