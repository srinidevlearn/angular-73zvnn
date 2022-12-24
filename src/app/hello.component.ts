import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { IEventBusModel } from '../sharedService/bus.data.model';
import { EventBusService } from '../sharedService/event-bus.service';

@Component({
  selector: 'hello',
  template: `<h1>
                  Hello {{name}}!
                  <div class="btn btn-sm btn-primary border-0 rounded-5" (click)="logInfo()">log</div>
            </h1>
            
            <pre>{{container | json}}</pre>
            `,

  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  @Input() name: string;
  container: IEventBusModel[] = [];

  constructor(
    private eventBus: EventBusService,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {
    this.eventBus.listen$
      .pipe(
        filter((e) => e.target === 'toApp1'),
        tap(() => this.cdr.detectChanges())
      )
      .subscribe((d) => {
        this.container.push(d);
        this.container = [...new Set(this.container)];
      });
  }

  logInfo() {
    this.eventBus.messageChannel({
      target: 'toApp2',
      payload: 'Hello from app 1',
    });
  }
}
