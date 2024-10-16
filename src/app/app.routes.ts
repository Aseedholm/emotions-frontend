import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AngerComponent } from './emotions/anger/anger.component';

export const routes: Routes = [
  { path: '', component: AppComponent }, // Default route
  { path: 'anger', component: AngerComponent }, // Route for anger component
  // Add more routes as needed
];
