import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/interfaces/booking';
import { BookingsApiService } from 'src/app/api/bookings-api.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { TapService } from 'src/app/services/tap.service';
import { ToastService } from 'src/app/services/toast.service';
import { EditBookingPage } from './edit-booking/edit-booking.page';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  bookings: Booking[];
  nextBooking: Booking;
  loading = false;
  error = false;
  bookingSubject: Subscription;
  constructor(
    private modalCtrl: ModalController,
    bookingsService: BookingsService,
    private bookingsApiService: BookingsApiService,
    private toastService: ToastService,
    private tap: TapService  ) {
    this.bookingSubject = bookingsService.getBookingSubject().subscribe(() => {
      this.getBookings();
    });
  }
  ngOnDestroy(): void {
    this.bookingSubject.unsubscribe();
  }
  ngOnInit() {
    this.getBookings();
  }
  getBookings = async (event?: any) => {
    this.loading = true;
    this.error = false;
    try {
      const bookings = await this.bookingsApiService.getBookings().toPromise();
      this.nextBooking = bookings[0];
      this.bookings = bookings;
    } catch (error) {
      this.error = true;
      (await this.toastService.setupToast('Loading error')).present();
    }
    finally {
      setTimeout(() => {
        this.loading = false;
        event?.target?.complete();
      }, 2000);
    }
  };
  itemTap() {
    this.tap.tapSelect();
  }

  presentModal = (componentProps: any) => {
    this.modalCtrl.create({
      component: EditBookingPage,
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,
      backdropDismiss: true,
      componentProps,
      // presentingElement: this.routerOutlet.parentOutlet.nativeEl,
      swipeToClose: true,
    }).then((modal) => {
      modal.present();
    });
  };

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
