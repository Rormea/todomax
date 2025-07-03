import { Type } from "class-transformer";
import { IsArray, IsDate, IsEmpty, IsEnum, IsIn, IsString, MinLength } from "class-validator";
import { PriorityEnum, StatusEnum } from "src/common";

export class CreateProjectDto {

    @IsString()
    @MinLength(3)
    projectName : string;

    @IsString()
    @MinLength(10)          
    description: string;

/*     @IsEmpty({message: 'Start date should not be empty'})
    @IsDate({message: 'Start date must be a valid date'})
    @Type(() => Date) // **IMPORTANTE:** Convierte la entrada (ej. string ISO 8601) a objeto Date
    startDate: Date; */

    //@IsDate({message: 'Start date must be a valid date'})
    //@Type(() => Date)
    //endDate?: Date;

   //@IsEnum(StatusEnum, {message: 'Status must be a valid enum value'})
    //status: StatusEnum;

    @IsEnum(PriorityEnum, {message: `Priority must be a valid enum value: ${Object.values(PriorityEnum).join(', ')}`})
    priority: PriorityEnum;

/*     @IsString({each: true, message: 'Status must be a string' })
    @IsArray()
    teamMembers: string[]; */

    @IsString()
    @MinLength(3)
    clientName: string;
}
