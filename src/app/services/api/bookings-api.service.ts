import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from 'src/app/interfaces/booking';
@Injectable({
  providedIn: 'root'
})

export class BookingsApiService {

  constructor(private httpClient: HttpClient) {
  }

  getBookings() {
    return this.httpClient.get<Booking[]>('http://192.168.1.180:8080/bookings');
  }
  getPastBookings(offset: number) {
    return this.httpClient.get<Booking[]>(`http://192.168.1.180:8080/bookings?type=past&offset=${offset}`);
  }
  getBooking(id: string) {
    return this.httpClient.get<Booking>(`http://192.168.1.180:8080/bookings/${id}`);
  }
  insertBooking(booking: Booking) {
    return this.httpClient.post<boolean>(`http://192.168.1.180:8080/bookings`, booking);
  }
  deleteBooking(id: number) {
    return this.httpClient.delete<boolean>(`http://192.168.1.180:8080/bookings/${id}`);
  }

}
