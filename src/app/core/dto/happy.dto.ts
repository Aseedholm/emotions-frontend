import { HappyData } from "../../shared/models/happy.model";
import { EmotionDto } from "./emotion.dto";


export interface HappyDto extends EmotionDto<HappyData>{
    somethingToRememberThisHappiness: string;
}

export interface CreateHappyDto extends HappyDto {}

export interface UpdateHappyDto extends Partial<CreateHappyDto>{}