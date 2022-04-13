import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, LoadingController, NavController } from '@ionic/angular';
import { Desk } from 'src/app/interfaces/desks';
import { Offices } from 'src/app/interfaces/offices';
import { AltertService } from 'src/app/services/alert.service';
import { BookingsApiService } from 'src/app/services/api/bookings-api.service';
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
  @ViewChild('datePicker') datePicker: IonDatetime;
  loading: boolean;
  loadingDesks: boolean;
  offices: Offices[];
  desks: Desk[];
  form: FormGroup;
  booked: boolean;
  minDate: string;
  constructor(
    private officeService: OfficesService,
    private formBuilder: FormBuilder,
    private boookingsApiService: BookingsApiService,
    private loadingController: LoadingControllerService,
    private navController: NavController,
    private toastService: ToastService,
    private tap: TapService,
    private bookingsService: BookingsService
  ) { }
  ngOnInit(): void {
    this.setForm();
    this.loadOffices();
  }
  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe((formValues) => {
      this.setDate();
    });
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
  itemTap(){
    this.tap.tapSelect();
  }
}
