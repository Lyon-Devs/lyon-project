import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointReplacerPipe } from './point-replacer.pipe';



@NgModule({
  declarations: [PointReplacerPipe],
  exports: [PointReplacerPipe],
  providers: [PointReplacerPipe]
})
export class PipesModule { }
