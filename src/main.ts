import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { App2Module } from './app2/app2.module';

const paltRef = platformBrowserDynamic();

paltRef
  .bootstrapModule(AppModule, { ngZone: 'noop' })
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef1']) {
      window['ngRef1'].destroy();
    }
    window['ngRef1'] = ref;
    console.log(ref);

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));

paltRef
  .bootstrapModule(App2Module, { ngZone: 'noop' })
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef2']) {
      window['ngRef2'].destroy();
    }
    window['ngRef2'] = ref;
    console.log(ref);

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
