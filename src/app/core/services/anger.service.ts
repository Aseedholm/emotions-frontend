import { Injectable } from "@angular/core";
import { EmotionService } from "./emotion.service";
import { AngerData, AngerEmotion } from "../../shared/models/anger.model";
import { Observable } from "rxjs";

@Injectable()
export class AngerService{
    constructor(private emotionService: EmotionService){}

    addAnger(emotion: AngerEmotion) : Observable<any> {
        return this.emotionService.addEmotion<AngerEmotion, AngerData>(emotion, '/anger');
    }

}