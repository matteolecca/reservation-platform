import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from 'src/app/interfaces/loginUser';
import { User } from 'src/app/interfaces/user';
import { SignupUser } from 'src/app/interfaces/signup-user';

@Injectable({
  providedIn: 'root'
})

export class AuthApiService {

  constructor(private httpClient: HttpClient) {
  }

  login(userData: LoginUser) {
    return this.httpClient.post<{ token: string }>('http://192.168.1.180:8080/users/login', userData);
  }
  signup(userData: SignupUser) {
    return this.httpClient.post<{ token: string }>('http://192.168.1.180:8080/users/signup', userData);
  }
  getUserData() {
    return this.httpClient.get<User>('http://192.168.1.180:8080/users/user-data');
  }
  validateToken(token: string) {
    return this.httpClient.post<any>('http://192.168.1.180:8080/users/validate-token', {
      token
    });
  }
  updatePassword(password: string) {
    return this.httpClient.post<any>(`http://192.168.1.180:8080/users/update-password`, { password });
  }
}
