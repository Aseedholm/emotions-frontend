// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { EmotionComponent } from './emotions/emotion/emotion.component';

@NgModule({
  declarations: [
    AppComponent,
    EmotionComponent // Declare your Emotion component here
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Set up routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
