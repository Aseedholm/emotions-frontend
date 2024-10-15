import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { AngerComponent } from './anger/anger.component';
import { AnxietyComponent } from './anxiety/anxiety.component';



@NgModule({
  declarations: [
    AngerComponent, 
    AnxietyComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AngerComponent,
    AnxietyComponent
  ]
})
export class EmotionsModule { }
