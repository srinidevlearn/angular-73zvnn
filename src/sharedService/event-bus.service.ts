import { Injectable } from '@angular/core';
import { distinctUntilChanged, Subject } from 'rxjs';
import { IEventBusModel } from '../sharedService/bus.data.model';

@Injectable({
  providedIn: 'platform',
})
export class EventBusService {
  private event$ = new Subject<IEventBusModel>();
  constructor() {
    console.log(new Date().getTime());
  }

  public get listen$() {
    return this.event$.asObservable().pipe(distinctUntilChanged());
  }

  messageChannel(message: IEventBusModel) {
    this.event$.next({ ...message, time: new Date().toLocaleString() });
  }
}
