import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerStateInterceptor } from './serverstate.interceptor';
import { RequestTimeoutHttpInterceptor, DEFAULT_TIMEOUT } from './timeout.interceptor';
import { TransferState } from '@angular/platform-browser';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: RequestTimeoutHttpInterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 5000 },
    TransferState
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
