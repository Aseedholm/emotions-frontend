import { Emotion } from "../../shared/models/emotion.model";

export class AddEmotion<T> {
    static readonly type = '[Emotion] Add';
    constructor(public payload: Emotion<T>) {}
  }
  
  export class RemoveEmotion {
    static readonly type = '[Emotion] Remove';
    constructor(public id: number) {}
  }
  
  export class UpdateEmotion<T> {
    static readonly type = '[Emotion] Update';
    constructor(public payload: Emotion<T>) {}
  }
  