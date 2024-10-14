import { Routes } from '@angular/router';
import { EmotionComponent } from './emotions/emotion/emotion.component'; // Adjust the path as necessary
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent }, // Default route
  { path: 'emotion', component: EmotionComponent }, // Add a route for your EmotionComponent
  // Other routes can be added here
];
