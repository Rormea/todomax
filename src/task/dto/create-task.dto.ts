import { IsEnum, IsString, MinLength } from "class-validator";
import { PriorityEnum } from "src/common";



export class CreateTaskDto {

    @IsString()
    @MinLength(3)
    taskName: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsEnum(PriorityEnum, {message: `Priority must be a valid enum value: ${Object.values(PriorityEnum).join(', ')}`})
    priority: PriorityEnum;
}
