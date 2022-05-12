import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  NavController } from '@ionic/angular';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { PasswordValidatorService } from 'src/app/services/password-validator.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;
  constructor(
    private loadingControllerService: LoadingControllerService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private passwordValidatorsService: PasswordValidatorService,
    private authApiService: AuthApiService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.setForm();
  }
  setForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required, this.passwordValidatorsService.checkValidator()]],
    });
  }
  async onSubmit() {
    const spinner = await this.loadingControllerService.setupLoadingController('Logging you in');
    spinner.present();
    try {
      const { token } = await this.authApiService.signup(this.form.value).toPromise();
      this.storageService.set('token', token);
      this.navController.navigateRoot('/home');
    } catch (error) {
      const toast = await this.toastService.setupToast(error.error.message, 2000);
      toast.present();
    }
    finally {
      spinner.dismiss();
    }
  }
  switchPage() {
    this.navController.navigateBack('login');
  }
}
