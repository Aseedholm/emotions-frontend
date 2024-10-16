import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { AngerComponent } from './anger/anger.component';
import { AnxietyComponent } from './anxiety/anxiety.component';
import { NgxsModule } from '@ngxs/store';
import { AngerState } from '../core/states/anger.state';
import { EmotionService } from '../core/services/emotion.service';
import { AngerService } from '../core/services/anger.service';
import { EmotionBaseComponent } from './emotion-base/emotion-base.component';



@NgModule({
  declarations: [
    AngerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxsModule.forRoot([AngerState])
  ],
  exports: [
    AngerComponent,
  ],
  providers: [EmotionService, AngerService]
})
export class EmotionsModule { }
