import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { IEventBusModel } from '../../sharedService/bus.data.model';
import { EventBusService } from '../../sharedService/event-bus.service';

@Component({
  selector: 'app-sample-hello-world',
  templateUrl: './sample-hello-world.component.html',
  styleUrls: ['./sample-hello-world.component.css'],
})
export class SampleHelloWorldComponent {
  @Input() name: string;
  container: IEventBusModel[] = [];
  constructor(
    private eventBus: EventBusService,
    private cdr: ChangeDetectorRef
  ) {
    this.eventBus.listen$
      .pipe(
        filter((e) => e?.target === 'toApp2'),
        tap(() => this.cdr.detectChanges())
      )
      .subscribe((d) => {
        this.container.push(d);
        this.container = [...new Set(this.container)];
      });
  }

  logInfo() {
    this.eventBus.messageChannel({
      target: 'toApp1',
      payload: 'Hello from app2',
    });
  }
}
