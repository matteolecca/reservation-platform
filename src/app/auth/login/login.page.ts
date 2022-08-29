import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form: FormGroup;
  spinner: HTMLIonLoadingElement;
  toast: HTMLIonToastElement;
  constructor(
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private loadingControllerService: LoadingControllerService,
    private toastService: ToastService,
    private storageService: StorageService,
  ) { }
  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signup() { }
  async onSubmit() {
    this.spinner = await this.loadingControllerService.setupLoadingController('Logging you in');
    this.toast = await this.toastService.setupToast('Invalid data', 2000);
    this.spinner.present();
    try {
      const { token } = await this.authApiService.login(this.form.value).toPromise();
      this.storageService.set('token', token);
      await this.authService.checkToken();
    } catch (error) {
      this.toast.present();
    }
    finally {
      this.spinner.dismiss();
    }
  }

}
