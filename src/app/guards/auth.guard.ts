import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthApiService } from '../api/auth-api.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authApiService: AuthApiService,
    private storageService: StorageService,
    private navController: NavController
  ) { }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    const token = await this.storageService.get('token');
    if (token) {
      try {
        const { valid } = await this.authApiService.validateToken(token).toPromise();
        if (valid) {
          return true;
        }
      } catch (error) {
        this.navController.navigateRoot('/login');
      }
    }
    return false;
  }
}
