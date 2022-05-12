import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Booking } from 'src/app/interfaces/booking';
import { AltertService } from 'src/app/services/alert.service';
import { BookingsApiService } from 'src/app/api/bookings-api.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';
import { LocalNotificationsService } from 'src/app/services/local-notifications.service';
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
    private alertService: AltertService,
    private localNotifications: LocalNotificationsService,
  ) { }

  async ngOnInit() {
    await this.localNotifications.getPermission();
    this.loadBookings(0);
  }
  async showNot() {
    await this.localNotifications.showLocalNotification();
  }
  async loadBookings(offset: number) {
    this.loadComplete = false;
    this.offset = 0;
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
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
  onDelete(id: number) {
    this.alertService.presentAlert([
      { id: 'back-button', text: 'Dismiss', handler: () => { } },
      { id: 'delete-button', text: 'Delete', handler: () => this.deleteBooking(id) },
    ]);
  }
  async deleteBooking(id: number) {
    const spinner = await this.loadingController.setupLoadingController('Deleting...');
    const toast = await this.toastService.setupToast('Error deleting');
    const toastSuccess = await this.toastService.setupToast('Deleted', 2000, 'success');
    spinner.present();
    try {
      await this.bookingsApiService.deleteBooking(id).toPromise();
      this.slots = this.slots.filter(slot => slot.id !== id);
      toastSuccess.present();
    } catch (error) {
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
  sort = () => {
    console.log(this.slots);
    this.slots.sort((first, second) => new Date(first.date).getTime() - new Date(second.date).getTime());
  };

}
