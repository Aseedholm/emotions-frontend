import { Component } from '@angular/core';
import { EmotionService } from '../../core/services/emotion.service';
import { EmotionDto } from '../../core/dto/emotion.dto';
import { response } from 'express';
import { AngerDto } from '../../core/dto/anger.dto';
import { AnxietyDto } from '../../core/dto/anxiety.dto';

@Component({
  template: '',  // No template here since it's an abstract class
  styleUrls: []  // No specific styles in this class
})
export abstract class EmotionBaseComponent<T extends EmotionDto<U>, U>{
  isEmphasized: boolean = false;
  showTextBox: boolean = false;
  userInput: string = '';

  constructor() {};

  toggleEmphasis() {
    this.isEmphasized = !this.isEmphasized;  // Toggle emphasis state
    this.showTextBox = !this.showTextBox;
  }

  handleEmotionEntry(emotionType: string) {
    if (this.userInput.trim()) {
        this.createEmotion(this.userInput);
        this.userInput = '';
    }
  }

  abstract createEmotion(context: string): void;

  abstract getEmotionData(): U;
}
