export interface BaseEmotion {
    id?: number;
    context: string;
    createdDate?: Date;
    title: string;
}

export interface Emotion<T> extends BaseEmotion {
    data: T;
}