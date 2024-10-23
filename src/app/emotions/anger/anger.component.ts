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

  override createEmotion(context: string, title: string): void {
    if (context && context.trim() && title && title.trim()) {
      const newAnger: AngerEmotion = {
        context,
        title,
        data: this.getEmotionData()
      };
      this.store.dispatch(new AddAnger(newAnger));
    }
  }

  override onBoxClick(): void {
    this.toggleEmphasis();
  }

  //TODO - May no longer need this.
  override onCarouselBoxClick(anger: AngerEmotion, index: number): void {
    // if (this.selectedEmotion<AngerEmotion> === anger) {
    //   this.selectedEmotionIndex = null;
    // } else {
    //   this.selectedEmotionIndex = index;
    //   this.userInputTitle = anger.title;
    //   this.userInputContext = anger.context;
    // }
    this.selectEmotion(anger, index);  // Use the new selectEmotion method
    this.inEditMode = false;
  }


   // Method to go to the previous set of anger emotions
   prevAnger() {
    if (this.currentEmotionIndex > 0) {
      this.currentEmotionIndex -= this.maxEmotionsToDisplay; // Move back by the max number of items to display
    }
  }

  // Method to go to the next set of anger emotions
  nextAnger() {
    const angers = this.store.selectSnapshot(state => state.anger); // Get the current state of angers
    if (this.currentEmotionIndex + this.maxEmotionsToDisplay < angers.length) {
      this.currentEmotionIndex += this.maxEmotionsToDisplay; // Move forward by the max number of items to display
    }
  }
}
