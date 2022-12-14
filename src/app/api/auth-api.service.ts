import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from 'src/app/interfaces/loginUser';
import { User } from 'src/app/interfaces/user';
import { SignupUser } from 'src/app/interfaces/signup-user';
import { environment } from 'src/environments/environment';
import { Site } from '../home/map/types';
@Injectable({
  providedIn: 'root'
})

export class AuthApiService {

  constructor(private httpClient: HttpClient) {
  }

  login(userData: LoginUser) {
    return this.httpClient.post<{ token: string }>(`${environment.baseUrl}/users/login`, userData);
  }
  signup(userData: SignupUser) {
    return this.httpClient.post<{ token: string }>(`${environment.baseUrl}/users/signup`, userData);
  }
  getUserData() {
    return this.httpClient.get<User>(`${environment.baseUrl}/users/user-data`);
  }
  validateToken(token: string) {
    return this.httpClient.post<any>(`${environment.baseUrl}/users/validate-token`, {
      token
    });
  }
  updatePassword(password: string) {
    return this.httpClient.post<any>(`${environment.baseUrl}/users/update-password`, { password });
  }
  getLocation(coords: { lat: number; lng: number }){
    return this.httpClient.get<any>(`${environment.baseUrl}/places?lat=${coords.lat}&lng=${coords.lng}`);
  }
  getSites(){
    return this.httpClient.get<Site[]>(`${environment.baseUrl}/places/sites`);
  }
}
