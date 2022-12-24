import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleHelloWorldComponent } from './sample-hello-world/sample-hello-world.component';
import { BrowserModule } from '@angular/platform-browser';
import { App2Component } from './app2/app2.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [SampleHelloWorldComponent, App2Component],
  bootstrap: [App2Component],
})
export class App2Module {}
