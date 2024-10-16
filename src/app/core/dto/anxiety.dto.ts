import { AnxietyData } from "../../shared/models/anxiety.model";
import { EmotionDto } from "./emotion.dto";

export interface AnxietyDto extends EmotionDto<AnxietyData>{
    intensity: number;
}