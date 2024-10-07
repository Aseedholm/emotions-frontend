// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'emotions-frontend';
  showFeedback = false; // New property to control feedback visibility

  handleMood(mood: string) {
    // Show feedback section when a mood is selected
    this.showFeedback = true;
  }
}
