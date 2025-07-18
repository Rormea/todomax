import { IsString, MaxLength, MinLength } from "class-validator";



export class TokenUserDto {



    @IsString()
    @MinLength(4)
    @MaxLength(4)

    token: string;

}