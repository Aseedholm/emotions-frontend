import { Component } from '@angular/core';
import { EmotionService } from '../../core/services/emotion.service';
import { EmotionBaseComponent } from '../emotion-base/emotion-base.component';
import { Observable } from 'rxjs';
import { AngerData } from '../../shared/models/anger.model';
import { AngerEmotion } from '../../shared/models/anger.model';
import { Store } from '@ngxs/store';
import { AddAnger, RemoveAnger } from '../../core/states/anger.state';
import { EmotionDto } from '../../core/dto/emotion.dto'; // Ensure the correct path

@Component({
  selector: 'app-anger',
  templateUrl: './anger.component.html',
  styleUrls: [
    './anger.component.scss',
    '../../../styles/emphasis-styles.scss',
  ]
})
export class AngerComponent extends EmotionBaseComponent<EmotionDto<AngerData>, AngerData> {
  angers$: Observable<AngerData[]>;

  constructor(emotionService: EmotionService, private store: Store) {
    super(emotionService);
    this.angers$ = this.store.select(state => state.anger);
  }

  // Implement the getEmotionData method
  getEmotionData(): AngerData {
    return {
      intensity: 0 // TODO: Set this to the actual intensity based on your logic
    };
  }

  addAnger() {
    // Use this.userInput and getEmotionData to create a new anger entry
    const newAnger: AngerEmotion = {
      context: this.userInput,
      data: this.getEmotionData()
    };

    // Optionally dispatch the AddAnger action here if you want to update the state
    this.store.dispatch(new AddAnger(newAnger));
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

  // Override handleEmotionEntry to add anger to the state
  override handleEmotionEntry(emotionType: string) {
    super.handleEmotionEntry(emotionType); // Call the base method

    // Optionally add the anger to the state if you want immediate UI feedback
    this.addAnger();
  }
}
