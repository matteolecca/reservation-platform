import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { withModule } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Animation, AnimationController, IonDatetime, IonModal, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Desk } from 'src/app/interfaces/desks';
import { Offices } from 'src/app/interfaces/offices';
import { AltertService } from 'src/app/services/alert.service';
import { BookingsApiService } from 'src/app/api/bookings-api.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { OfficesService } from 'src/app/services/offices.service';
import { TapService } from 'src/app/services/tap.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements AfterViewInit, OnInit {
  @ViewChild(IonDatetime) datePicker: IonDatetime;
  @ViewChild(IonModal) ionModal: IonModal;
  loading: boolean;
  loadingDesks: boolean;
  offices: Offices[];
  desks: Desk[];
  form: FormGroup;
  booked: boolean;
  minDate: string;
  showDate = false;
  showClass = 'show';
  constructor(
    private officeService: OfficesService,
    private formBuilder: FormBuilder,
    private boookingsApiService: BookingsApiService,
    private loadingController: LoadingControllerService,
    private navController: NavController,
    private toastService: ToastService,
    private tap: TapService,
    private bookingsService: BookingsService,
    private modalController: ModalController,
    private animationCtrl: AnimationController
  ) {
  }
  ngOnInit(): void {
    this.setForm();
    this.loadOffices();
  }

  registerModalSubscriptions() {
    this.ionModal?.willDismiss.subscribe(e => {
      this.showClass = 'hide';
    });
    this.ionModal?.willPresent.subscribe(e => this.showClass = 'show');

  }

  ngAfterViewInit(): void {
    this.registerModalSubscriptions();
    this.form.valueChanges.subscribe((formValues) => {
      this.setDate();
    });
  }
  dateEnabled(date: any) {
    const d = new Date(date);
    return d.getDay() !== 6 && d.getDay() !== 0;
  }

  setDate() {
    this.minDate = new Date().toISOString().substring(0, 10);
  }

  setForm() {
    this.form = this.formBuilder.group({
      site: ['', Validators.required],
      date: ['', Validators.required],
      desk: ['', Validators.required],
    });
    this.form.valueChanges.subscribe((formValues) => {
      if (formValues.date && !this.desks) {
        this.loadDesks();
      }
    });
  }

  loadDesks = async () => {
    this.loadingDesks = true;
    try {
      this.desks = await this.officeService.loadDesks();
    } catch (error) {
    }
    finally {
      this.loadingDesks = false;
    }
  };

  loadOffices = async () => {
    this.loading = true;
    try {
      this.offices = await this.officeService.loadOffices();
    } catch (error) {
    }
    finally {
      this.loading = false;
    }
  };

  onSubmit = async () => {
    this.itemTap();
    const spinner = await this.loadingController.setupLoadingController('Inserting...');
    const toast = await this.toastService.setupToast('Error inserting!');
    spinner.present();
    try {
      await this.boookingsApiService.insertBooking(this.form.value).toPromise();
      this.tap.tapSuccess();
      this.booked = true;
      this.form.reset();
      const sub = this.bookingsService.getBookingSubject();
      sub.next();
    } catch (er) {
      this.tap.tapError();
      toast.present();
    }
    finally {
      spinner.dismiss();
    }
  };

  navigateAway() {
    this.itemTap();
    this.booked = false;
    this.navController.navigateBack('home/bookings');
  }
  itemTap() {
    this.tap.tapSelect();
  }

}
