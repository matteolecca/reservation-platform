import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { StorageService } from '../../storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private storageService: StorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return from(this.setToken(req, next));
  }

  setToken = async (req: HttpRequest<any>, next: HttpHandler) => {
    const token = await this.storageService.get('token');
    console.log('TOKEN', token);
    if (token) {
      req = req.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: token,
        }
      });
    }
    return next.handle(req).toPromise();
  };
}


