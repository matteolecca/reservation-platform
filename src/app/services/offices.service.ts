import { Injectable } from '@angular/core';
import { Offices } from '../interfaces/offices';
import { Desk } from '../interfaces/desks';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  offices: Offices[] = [
    {
      id: 0,
      officeTitle: 'Milano'
    },
    {
      id: 1,
      officeTitle: 'Maranello'
    },
    {
      id: 2,
      officeTitle: 'Cagliari'
    },
    {
      id: 3,
      officeTitle: 'Napoli'
    },

  ];
  loading: boolean;
  constructor() { }

  loadOffices = async (): Promise<Offices[]> => new Promise((res, rej) => setTimeout(() => {
    res(this.offices);
  }, 2000));

  loadDesks = async (): Promise<Desk[]> => new Promise((res, rej) => {
      setTimeout(() => {
        const desks = Array.from(new Array(20)).map((s, i) => ({ id: i, nr: i }));
        res(desks);
      }, 2000);
    });
}
