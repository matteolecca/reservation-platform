import { Component, Input, OnInit } from '@angular/core';
import { Booking } from 'src/app/interfaces/booking';
import { TapService } from 'src/app/services/tap.service';

@Component({
  selector: 'app-small-slot',
  templateUrl: './small-slot.component.html',
  styleUrls: ['./small-slot.component.scss'],
})
export class SmallSlotComponent implements OnInit {
  @Input() presentModal: (args: any) => void;
  @Input() slot: Booking;
  @Input() loading: boolean;
  constructor(
    private tap: TapService
  ) { }

  ngOnInit() { }

  click() {
    this.presentModal(this.slot);
    this.tap.tapSelect();
  }

}
