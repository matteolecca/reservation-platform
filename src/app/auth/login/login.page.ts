import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  spinner: HTMLIonLoadingElement;
  toast: HTMLIonToastElement;
  constructor(
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private navController: NavController,
    private loadingControllerService: LoadingControllerService,
    private toastService: ToastService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  signup(){}
  async onSubmit() {
    this.spinner = await this.loadingControllerService.setupLoadingController('Logging you in');
    this.toast = await this.toastService.setupToast('Invalid data', 2000);
    this.spinner.present();
    try {
      const { token } = await this.authApiService.login(this.form.value).toPromise();
      this.storageService.set('token', token);
      this.navController.navigateRoot('/home');
    } catch (error) {
      this.toast.present();
    }
    finally {
      this.spinner.dismiss();
    }
  }

}
