import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEmotion } from '../../shared/models/emotion.model';
import { EmotionDto } from '../dto/emotion.dto';
import { environments } from '../../../environments/environments';

@Injectable()
export class EmotionService {
    private baseApiUrl : string = environments.apiUrl;
  constructor(private http: HttpClient) {}

  addEmotion<T extends EmotionDto<U>, U>(dto: T, endpoint: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/${endpoint}`, dto);
  }

  deleteEmotion(id: number, endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/${endpoint}/${id}`);
  }

  
}
