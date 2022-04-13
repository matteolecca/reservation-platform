import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private bookingSubject = new Subject();

  constructor() { }
  getBookingSubject(): Subject<any> {
    return this.bookingSubject;
  }
  updateBookings(){
    this.bookingSubject.next();
  }

}
