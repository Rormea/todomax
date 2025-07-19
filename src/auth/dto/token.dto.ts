import { IsString, MaxLength, MinLength } from "class-validator";



export class TokenUserDto {



    @IsString()
    @MinLength(6)

    token: string;

}