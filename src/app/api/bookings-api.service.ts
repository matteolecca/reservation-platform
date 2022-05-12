import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from 'src/app/interfaces/booking';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class BookingsApiService {

  constructor(private httpClient: HttpClient) {
  }

  getBookings() {
    return this.httpClient.get<Booking[]>(`${environment.baseUrl}/bookings`);
  }
  getPastBookings(offset: number) {
    return this.httpClient.get<Booking[]>(`${environment.baseUrl}/bookings?type=past&offset=${offset}`);
  }
  getBooking(id: string) {
    return this.httpClient.get<Booking>(`${environment.baseUrl}/bookings/${id}`);
  }
  insertBooking(booking: Booking) {
    return this.httpClient.post<boolean>(`${environment.baseUrl}/bookings`, booking);
  }
  deleteBooking(id: number) {
    return this.httpClient.delete<boolean>(`${environment.baseUrl}/bookings/${id}`);
  }

}
