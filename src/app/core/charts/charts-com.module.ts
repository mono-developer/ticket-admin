import { NgModule } from '@angular/core';
import { nvD3 } from './nvD3/nvD3.component';
import { D3ChartService } from './nvD3/nvD3.service';


@NgModule({
  imports: [
  ],
  declarations: [ nvD3 ],
  exports: [nvD3 ],
  providers: [D3ChartService]
})
export class ChartsComModule { }
