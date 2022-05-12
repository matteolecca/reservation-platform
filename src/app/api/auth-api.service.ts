import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from 'src/app/interfaces/loginUser';
import { User } from 'src/app/interfaces/user';
import { SignupUser } from 'src/app/interfaces/signup-user';
import { environment } from 'src/environments/environment';
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
}
