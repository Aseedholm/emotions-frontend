import { Emotion } from "./emotion.model";

export interface AngerData {
    intensity: number;
}

export interface AngerEmotion extends Emotion<AngerData> {}