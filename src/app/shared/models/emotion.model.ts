export interface BaseEmotion {
    id?: number;
    context: string;
}

export interface Emotion<T> extends BaseEmotion {
    data: T;
}