import { Injectable } from "@angular/core";
import { EmotionService } from "./emotion.service";
import { AngerData, AngerEmotion } from "../../shared/models/anger.model";
import { Observable, lastValueFrom } from "rxjs";

@Injectable()
export class AngerService{
    constructor(private emotionService: EmotionService){}

    //TODO Add ASYNC/AWAIT
    addAnger(emotion: AngerEmotion) : Promise<AngerEmotion> {
        return this.emotionService.addEmotion<AngerEmotion, AngerData>(emotion, 'anger');
    }

   getAnger() : Promise<AngerEmotion[]> {
        return this.emotionService.getEmotions<AngerEmotion>('anger');
    }

}