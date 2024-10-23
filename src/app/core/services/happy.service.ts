import { Injectable } from "@angular/core";
import { EmotionService } from "./emotion.service";
import { HappyData, HappyEmotion } from "../../shared/models/happy.model";
import { Observable } from "rxjs";


@Injectable()
export class HappyService{
    constructor(private emotionService: EmotionService){}

    //TODO Add ASYNC/AWAIT
    addHappy(emotion: HappyEmotion) : Promise<HappyEmotion> {
        return this.emotionService.addEmotion<HappyEmotion, HappyData>(emotion, 'happy');
    }

    getHappy() : Promise<HappyEmotion[]> {
        return this.emotionService.getEmotions<HappyEmotion>('happy');
    }

}