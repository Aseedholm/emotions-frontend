import { Component } from '@angular/core';
import { EmotionService } from '../../core/services/emotion.service';
import { EmotionBaseComponent } from '../emotion-base/emotion-base.component';

@Component({
  selector: 'app-anger',
  templateUrl: './anger.component.html',
  styleUrls: [
    './anger.component.scss',
    '../../../styles/emphasis-styles.scss',
  ]
})
export class AngerComponent extends EmotionBaseComponent{
  constructor(emotionService: EmotionService) {
    super(emotionService);
  }

  onBoxClick() {
    this.toggleEmphasis();
    this.handleEmotionEntry('anger');
  }

  handleEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleEmotionEntry('anger');
    }
  }
}
