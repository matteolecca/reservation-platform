import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingsListPage } from './bookings-list.page';

const routes: Routes = [
  {
    path: '',
    component: BookingsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsListPageRoutingModule {}
