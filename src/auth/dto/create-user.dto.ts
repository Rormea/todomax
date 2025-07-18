import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class CreateUserDto {


    @IsNotEmpty()
    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: "Username must be at least 3 characters long" })
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    // ⭐ Este campo solo existe en el DTO para validación ⭐
    // Usamos Transform para que no aparezca si se intenta mapear automáticamente
    @Transform(({ value }) => value, { toClassOnly: true } )    
    passConfirm: string;



}