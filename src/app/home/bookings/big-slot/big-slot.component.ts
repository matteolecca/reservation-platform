import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/interfaces/booking';
import { TapService } from 'src/app/services/tap.service';

@Component({
  selector: 'app-big-slot',
  templateUrl: './big-slot.component.html',
  styleUrls: ['./big-slot.component.scss'],
})
export class BigSlotComponent implements OnInit {
  @Input() openSlot: (args: any) => void;
  @Input() slot: Booking;
  @Input() loading: boolean;

  constructor(private tap: TapService) {
  }
  ngOnInit(): void {
  }
  selectSlot() {
    this.tap.tapSelect();
    this.openSlot({ slotId: this.slot.id });
  }

}
