import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBookingPageRoutingModule } from './edit-booking-routing.module';

import { EditBookingPage } from './edit-booking.page';
import { EditSkeletonComponent } from '../edit-skeleton/edit-skeleton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBookingPageRoutingModule
  ],
  declarations: [EditBookingPage, EditSkeletonComponent]
})
export class EditBookingPageModule {}
