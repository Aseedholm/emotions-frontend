import { AngerData } from "../../shared/models/anger.model";
import { EmotionDto } from "./emotion.dto";

export interface AngerDto extends EmotionDto<AngerData>{
    intensity: number;
}

export interface CreateAngerDto extends AngerDto {
}