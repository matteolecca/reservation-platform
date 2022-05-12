import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsListPageRoutingModule } from './bookings-list-routing.module';

import { BookingsListPage } from './bookings-list.page';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingsListPageRoutingModule
  ],
  declarations: [BookingsListPage,FilterComponent]
})
export class BookingsListPageModule {}
