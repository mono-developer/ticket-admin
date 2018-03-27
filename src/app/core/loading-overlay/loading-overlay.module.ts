import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';
import { LoadingOverlayComponent } from './loading-overlay.component';

@NgModule({
  imports: [
    MatProgressBarModule
  ],
  declarations: [ LoadingOverlayComponent ],
  exports: [LoadingOverlayComponent],
  providers: []
})
export class LoadingOverlayModule { }
