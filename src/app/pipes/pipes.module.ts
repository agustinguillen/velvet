import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './poster.pipe';
import { SafePipe } from './safe.pipe';
import { GenrePipe } from './genre.pipe';



@NgModule({
  declarations: [
    PosterPipe,
    SafePipe,
    GenrePipe
  ],
  exports:[
    PosterPipe,
    SafePipe,
    GenrePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
