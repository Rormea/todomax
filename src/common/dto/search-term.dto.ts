import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";



export class SearchTermDto {

    @IsString()
    @MinLength(3, { message: 'Search term must be at least 3 characters long.' })
    @IsNotEmpty()
    @Transform(({ value }) => typeof value === 'string' ? value.toLowerCase() : value)
    searchTerm: string;

};