import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmotionDto } from "../dto/emotion.dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmotionService {
    private baseUrl = 'http://localhost:3000';  // Replace with your actual backend API URL

    constructor(private http: HttpClient) {}

    //todo fix typesafety of Observable<any>
    createEmotion(emotionType: string, dto: EmotionDto) : Observable<any> {
        // Send a POST request to create a new emotion entry with type safety
        return this.http.post(`${this.baseUrl}/${emotionType}`, dto);
    }
}