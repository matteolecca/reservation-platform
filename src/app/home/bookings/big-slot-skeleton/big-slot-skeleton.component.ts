import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-slot-skeleton',
  templateUrl: './big-slot-skeleton.component.html',
  styleUrls: ['./big-slot-skeleton.component.scss'],
})
export class BigSlotSkeletonComponent implements OnInit {
  @Input() loading: boolean;
  constructor() { }

  ngOnInit() { }

}
