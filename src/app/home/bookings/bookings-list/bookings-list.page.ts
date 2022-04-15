import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Booking } from 'src/app/interfaces/booking';
import { BookingsApiService } from 'src/app/services/api/bookings-api.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.page.html',
  styleUrls: ['./bookings-list.page.scss'],
})
export class BookingsListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  slots: Booking[];
  offset = 0;
  limit = 10;
  loadComplete = false;
  constructor(
    private bookingsApiService: BookingsApiService,
    private bookingsService: BookingsService,
    private loadingController: LoadingControllerService,
    private toastService: ToastService,
  ) { }

  async ngOnInit() {
    this.loadBookings(0);
  }
  async loadBookings(offset: number) {
    this.loadComplete = false;
    this.offset = 0;
    const spinner = await this.loadingController.setupLoadingController('Loading slots...');
    spinner.present();
    try {
      this.slots = await this.bookingsApiService.getPastBookings(offset).toPromise();
    } catch (error) {
    }
    finally {
      spinner.dismiss();
    }
  }
  async deleteBooking(id: number) {
    const spinner = await this.loadingController.setupLoadingController('Deleting...');
    const toast = await this.toastService.setupToast('Error deleting');
    const toastSuccess = await this.toastService.setupToast('Deleted', 2000, 'success');
    spinner.present();
    try {
      await this.bookingsApiService.deleteBooking(id).toPromise();
      this.slots = this.slots.filter(slot => slot.id !== id);
    } catch (error) {
      console.error('ERROr deleting');
      toast.present();
    }
    finally {
      spinner.dismiss();
    }
  }
  async loadMoreData(event) {
    await this.loadBookings(0);
    event.target.complete();
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
  }
  async onPageEnd(event) {
    if (this.slots.length < (this.limit * (this.offset + 1))) {
      this.loadComplete = true;
      this.infiniteScroll.disabled = true;
    }
    else {
      this.offset += 10;
      const slots = await this.bookingsApiService.getPastBookings(this.offset).toPromise();
      this.slots = [...this.slots, ...slots];
      this.infiniteScroll.complete();
    }
  }

}
