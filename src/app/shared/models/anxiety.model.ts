import { Emotion } from "./emotion.model";

export interface AnxietyData {
    intensity: number;
}

export interface AnxietyEmotion extends Emotion<AnxietyData> {}