import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { Booking } from 'src/app/interfaces/booking';
import { AltertService } from 'src/app/services/alert.service';
import { BookingsApiService } from 'src/app/services/api/bookings-api.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.page.html',
  styleUrls: ['./edit-booking.page.scss'],
})
export class EditBookingPage implements OnInit {
  loading = false;
  booking: Booking;
  constructor(
    private navParams: NavParams,
    private alertService: AltertService,
    private bookingApiService: BookingsApiService,
    private loadingController: LoadingControllerService,
    private bookingService: BookingsService,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.loadBooking();
  }
  async loadBooking() {
    const { slotId } = this.navParams.data;
    console.log('SLOT ID', slotId);
    this.loading = true;
    try {
      this.booking = await this.bookingApiService.getBooking(slotId).toPromise();
      console.log(this.booking, this.loading);
    } catch (error) {
      console.error('Error loading');
    }
    finally {
      this.loading = false;
      console.log(this.booking, this.loading);
    }
  }
  setEdit() { }
  setDelete() {
    this.alertService.presentAlert([
      { id: 'back-button', text: 'Dismiss', handler: () => { } },
      { id: 'delete-button', text: 'Delete', handler: () => this.deleteBooking(this.booking.id) },
    ]);
  }
  async deleteBooking(id: number) {
    const spinner = await this.loadingController.setupLoadingController('Deleting...');
    const toast = await this.toastService.setupToast('Error deleting');
    const toastSuccess = await this.toastService.setupToast('Deleted', 2000, 'success');
    spinner.present();
    try {
      await this.bookingApiService.deleteBooking(id).toPromise();
      toastSuccess.present();
    } catch (error) {
      console.error('ERROr deleting');
      toast.present();
    }
    finally {
      this.modalController.dismiss();
      spinner.dismiss();
      this.bookingService.updateBookings();
    }
  }
}