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
export abstract class EmotionBaseComponent {
  isEmphasized: boolean = false;
  showTextBox: boolean = false;
  userInput: string = '';

  constructor(private emotionService: EmotionService) {};

  toggleEmphasis() {
    this.isEmphasized = !this.isEmphasized;  // Toggle emphasis state
    this.showTextBox = !this.showTextBox;
  }

  handleEmotionEntry(emotionType: string) {
    if (this.userInput.trim()) {
        this.createEmotion(emotionType, this.userInput);
        this.userInput = '';
    }
  }

  createEmotion(emotionType: string, context: string) {
    const dto : AngerDto | AnxietyDto = {
      intensity: 0,
      context
    };

    this.emotionService.createEmotion(emotionType, dto).subscribe({
        //todo fix type safety
        next: (response: any) => {
            console.log(`${emotionType} entry created successfully:`, response);
        },
        error: (err: any) => {
            console.error(`Error creating ${emotionType} entry:`, err);
        }
    });
  }
}
