import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { BaseEmotion } from '../../shared/models/emotion.model';
import { EmotionDto } from '../dto/emotion.dto';
import { environments } from '../../../environments/environments';
import { error } from 'node:console';

@Injectable()
export class EmotionService {
    private baseApiUrl : string = environments.apiUrl;
  constructor(private http: HttpClient) {}

  async addEmotion<T extends EmotionDto<U>, U>(dto: T, endpoint: string): Promise<T> {
    return await lastValueFrom(
      this.http.post<T>(`${this.baseApiUrl}/${endpoint}`, dto).pipe(
        catchError(this.handleError)
      )
    );
  }

  async deleteEmotion(id: number, endpoint: string): Promise<number> {
    return await lastValueFrom(
      this.http.delete<number>(`${this.baseApiUrl}/${endpoint}/${id}`).pipe(
        catchError(this.handleError)
      )
    );
  }

  async getEmotions<T>(endpoint: string) : Promise<T[]> {
    return lastValueFrom(
      this.http.get<T[]>(`${this.baseApiUrl}/${endpoint}`).pipe(
        catchError(this.handleError)
      )
    );
  }

  //returns an observable.
  private handleError(error: any) {
    console.log(error);
    return throwError(() => new Error(error.message || 'Try again later'));
  }

  
}
