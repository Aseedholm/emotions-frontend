export interface EmotionDto<T> {
    id?: number;
    createdDate?: Date;
    title: string;
    context: string;
    data: T;
}