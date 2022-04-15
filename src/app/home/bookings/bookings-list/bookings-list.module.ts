import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsListPageRoutingModule } from './bookings-list-routing.module';

import { BookingsListPage } from './bookings-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingsListPageRoutingModule
  ],
  declarations: [BookingsListPage]
})
export class BookingsListPageModule {}
