import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './poster.pipe';
import { SafePipe } from './safe.pipe';



@NgModule({
  declarations: [
    PosterPipe,
    SafePipe
  ],
  exports:[
    PosterPipe,
    SafePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
