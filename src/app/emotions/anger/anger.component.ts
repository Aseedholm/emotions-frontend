import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AngerData, AngerEmotion } from '../../shared/models/anger.model';
import { AddAnger, GetAnger, RemoveAnger } from '../../core/states/anger.state';
import { EmotionService } from '../../core/services/emotion.service';
import { EmotionBaseComponent } from '../emotion-base/emotion-base.component';
import { EmotionDto } from '../../core/dto/emotion.dto';

@Component({
  selector: 'app-anger',
  templateUrl: './anger.component.html',
  styleUrls: [
    './anger.component.scss',
    '../../../styles/emphasis-styles.scss',
  ]
})
export class AngerComponent extends EmotionBaseComponent<EmotionDto<AngerData>, AngerData> {
  angers$: Observable<AngerEmotion[]>;
  maxAngersToDisplay: number = 5;
  currentAngerIndex: number = 0;


  constructor(private store: Store) {
    super();
    // Using store.select to get the anger state
    this.angers$ = this.store.select(state => state.anger);
  }

  ngOnInit() {
    this.fetchAngerEmotions();
  }

  private fetchAngerEmotions() {
    this.store.dispatch(new GetAnger());
  }

  override getEmotionData(): AngerData {
    return {
      intensity: 0 // TODO: Set this to the actual intensity based on your logic
    };
  }

  override createEmotion(context: string): void {
    const newAnger: AngerEmotion = {
      context,
      data: this.getEmotionData()
    };
    this.store.dispatch(new AddAnger(newAnger));
  }

  addAnger() {
    const newAnger: AngerEmotion = {
      context: this.userInput,
      data: this.getEmotionData()
    };
    this.store.dispatch(new AddAnger(newAnger));
  }

  onBoxClick() {
    this.toggleEmphasis();
  }

  handleEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleEmotionEntry('anger');
    }
  }

  override handleEmotionEntry(emotionType: string) {
    super.handleEmotionEntry(emotionType); 
    this.addAnger();
  }

   // Method to go to the previous set of anger emotions
   prevAnger() {
    if (this.currentAngerIndex > 0) {
      this.currentAngerIndex -= this.maxAngersToDisplay; // Move back by the max number of items to display
    }
  }

  // Method to go to the next set of anger emotions
  nextAnger() {
    const angers = this.store.selectSnapshot(state => state.anger); // Get the current state of angers
    if (this.currentAngerIndex + this.maxAngersToDisplay < angers.length) {
      this.currentAngerIndex += this.maxAngersToDisplay; // Move forward by the max number of items to display
    }
  }
}
