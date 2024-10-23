import { Component } from '@angular/core';
import { EmotionService } from '../../core/services/emotion.service';
import { EmotionDto } from '../../core/dto/emotion.dto';
import { response } from 'express';
import { AngerDto } from '../../core/dto/anger.dto';
import { AnxietyDto } from '../../core/dto/anxiety.dto';
import { Emotion } from '../../shared/models/emotion.model';

@Component({
  template: '',  // No template here since it's an abstract class
  styleUrls: []  // No specific styles in this class
})
export abstract class EmotionBaseComponent<T extends EmotionDto<U>, U>{
  isEmphasized: boolean = false;
  showTextBox: boolean = false;
  userInputContext: string = '';
  userInputTitle: string = '';
  selectedEmotionIndex: number | null = null;
  maxEmotionsToDisplay: number = 5;
  currentEmotionIndex: number = 0;
  inEditMode: boolean = false;
  selectedEmotion: T | null = null;

  constructor() {};

  toggleEmphasis() {
    if (this.isEmphasized === false) {
      this.deselectEmotion();
    }
    this.isEmphasized = !this.isEmphasized;
    this.showTextBox = !this.showTextBox;
    this.inEditMode = true;
  }

  /**
   * This function will be called by all children classes to handle the button click of an emotion. 
   * createEmotion will be implemented by the child class.
   */
  handleEmotionEntry() {
    if (this.userInputContext && this.userInputContext.trim() && this.userInputTitle && this.userInputTitle.trim()) {
        this.createEmotion(this.userInputContext, this.userInputTitle);
        this.clearUserInput();
    }
  }

  /**
   * This function sets the user inputs to default values.
   */
  clearUserInput() {
    this.userInputContext = '';
    this.userInputTitle = '';
  }

    // New method to handle selection of an emotion
    selectEmotion(emotion: T, index: number): void {
      if (this.selectedEmotion === emotion) {
        this.deselectEmotion();
      } else {
        this.selectedEmotion = emotion;  // Set the selected emotion
        this.selectedEmotionIndex = index;  // Update the index
        this.userInputTitle = emotion.title;  // Pre-fill inputs with the selected emotion's data
        this.userInputContext = emotion.context;
      }
    }

    deselectEmotion() {
      this.clearSelectedEmotion();
      this.clearUserInput();
      this.inEditMode = true;
    }

    clearSelectedEmotion() {
      this.selectedEmotion = null;  // Deselect if the same emotion is clicked
      this.selectedEmotionIndex = null;
    }

    editable() {
      this.inEditMode = !this.inEditMode;
    }

  /**
   * 
   * @param context This represents the input into the text area body by the user.
   * @param title This represents the input into the input field by the user.
   */
  abstract createEmotion(context: string, title: string): void;

  /**
   * 
   */
  abstract getEmotionData(): U;

  /**
   * 
   */
  abstract onBoxClick(): void;

  /**
   * 
   * @param emotion 
   * @param index 
   */
  abstract onCarouselBoxClick(emotion: T, index: number): void;
}
