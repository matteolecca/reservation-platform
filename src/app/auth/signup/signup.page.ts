import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { NavController } from '@ionic/angular';
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
  inputList = [
    {
      formControlName: 'username',
      placeholder: 'Username',
      type: 'text',
      name: 'email',
      controls: ['', [Validators.required]]
    },
    {
      formControlName: 'email',
      placeholder: 'Email',
      type: 'email',
      controls: ['', [Validators.required, Validators.email]],
    },
    {
      formControlName: 'password',
      placeholder: 'Password',
      type: 'password',
      controls: ['', [Validators.required]],
    },
    {
      formControlName: 'repeatPassword',
      placeholder: 'Repeat Password',
      type: 'password',
      controls: ['', [Validators.required, this.passwordValidatorsService.checkValidator()]],
    }
  ];
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
    Keyboard.setResizeMode({ mode: KeyboardResize.Body });
  }
  setForm() {
    const formControls = this.inputList.reduce((acc, { formControlName, controls }) => {
      acc[formControlName] = controls;
      return acc;
    }, {});
    this.form = this.formBuilder.group(formControls);
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
