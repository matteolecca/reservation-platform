import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingsPage } from './bookings.page';

const routes: Routes = [
  {
    path: '',
    component: BookingsPage
  },
  {
    path: 'edit-booking',
    loadChildren: () => import('./edit-booking/edit-booking.module').then( m => m.EditBookingPageModule)
  },
  {
    path: 'bookings-list',
    loadChildren: () => import('./bookings-list/bookings-list.module').then( m => m.BookingsListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsPageRoutingModule {}
