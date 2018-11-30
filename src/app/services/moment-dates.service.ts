import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentDatesService {

  constructor() { }

  formatDate(date: Date): string {
    return moment(date).format('LL');
  }

  formatDateShort(date: Date): string {
    return moment(date).format('MMMM Do');
  }
}
