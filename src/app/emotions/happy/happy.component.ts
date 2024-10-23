import { Component } from '@angular/core';
import { EmotionBaseComponent } from '../emotion-base/emotion-base.component';
import { EmotionDto } from '../../core/dto/emotion.dto';
import { HappyData, HappyEmotion } from '../../shared/models/happy.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddHappy, GetHappy } from '../../core/states/happy.state';

@Component({
  selector: 'app-happy',
  templateUrl: './happy.component.html',
  styleUrls: ['./happy.component.scss',
  '../../../styles/emphasis-styles.scss']
})
export class HappyComponent extends EmotionBaseComponent<EmotionDto<HappyData>, HappyData> {
  happys$: Observable<HappyEmotion[]>;

  constructor(private store: Store) {
    super();
    this.happys$ = this.store.select((state : any) => state.happy);
  }

  ngOnInit() {
    this.fetchHappyEmotions();
  }

  private fetchHappyEmotions() {
    this.store.dispatch(new GetHappy());
  }

  override getEmotionData(): HappyData {
    return {
      somethingToRememberThisHappiness: 'Test'
    };
  }

  override createEmotion(context: string, title: string): void {
    if (context && context.trim() && title && title.trim()) {
      const newHappy: HappyEmotion = {
        context, 
        title,
        data: this.getEmotionData()
      };
      this.store.dispatch(new AddHappy(newHappy));
    }
  }

  override onBoxClick(): void {
    this.toggleEmphasis();
  }

  override onCarouselBoxClick(happy: HappyEmotion, index: number): void {
    this.selectEmotion(happy, index);
    this.inEditMode = false;
  }

  prevHappy() {
    if (this.currentEmotionIndex > 0) {
      this.currentEmotionIndex -= this.maxEmotionsToDisplay; // Move back by the max number of items to display
    }
  }

  //Carousel logic can be refactored out and made into something common / generic.
  nextHappy() {
    const happys = this.store.selectSnapshot(state => state.happy);
    if (this.currentEmotionIndex + this.maxEmotionsToDisplay < happys.length) {
      this.currentEmotionIndex += this.maxEmotionsToDisplay;
    }
  }
}
