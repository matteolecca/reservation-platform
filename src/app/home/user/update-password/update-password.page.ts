import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { PasswordValidatorService } from 'src/app/services/password-validator.service';
import { TapService } from 'src/app/services/tap.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private authApiService: AuthApiService,
    private navController: NavController,
    private loadingControllerService: LoadingControllerService,
    private passwordValidatorService: PasswordValidatorService,
    private tap: TapService
  ) { }

  ngOnInit(
  ) {
    this.setupForm();
  }
  itemTap(){
    this.tap.tapSelect();
  }
  setupForm() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), this.passwordValidatorService.checkValidator()]],
    });
  }
  async onSubmit() {
    const spinner = await this.loadingControllerService.setupLoadingController('Updating password...');
    const { password, repeatPassword } = this.form.value;
    if (password !== repeatPassword) {
      const toast = await this.toastService.setupToast('Passwords should match!');
      return toast.present();
    }
    try {
      spinner.present();
      await this.authApiService.updatePassword(password).toPromise();
      const toast = await this.toastService.setupToast('Password updated', 2000, 'success');
      setTimeout(() => {
        this.tap.tapSuccess();
        spinner.dismiss();
        toast.present();
        this.navController.navigateBack('home/user');
      }, 2000);
    } catch (error) {
      this.tap.tapError();
      const toast = await this.toastService.setupToast('Error updating password');
      toast.present();
    }
    finally {
    }
  }
}
