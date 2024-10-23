import { Emotion } from "./emotion.model";

export interface HappyData {
    somethingToRememberThisHappiness: string;
}

export interface HappyEmotion extends Emotion<HappyData> {}