import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { SmallSlotComponent } from './small-slot/small-slot.component';
import { BigSlotComponent } from './big-slot/big-slot.component';
import { SlotsSleketonComponent } from './slots-sleketon/slots-sleketon.component';
import { BigSlotSkeletonComponent } from './big-slot-skeleton/big-slot-skeleton.component';
import { EmptyComponent } from 'src/app/components/empty/empty.component';
import { ErrorComponent } from 'src/app/components/error/error.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingsPageRoutingModule
  ],
  declarations: [
    BookingsPage,
    SmallSlotComponent,
    BigSlotComponent,
    SlotsSleketonComponent,
    BigSlotSkeletonComponent,
    EmptyComponent,
    ErrorComponent
  ]
})
export class BookingsPageModule { }
