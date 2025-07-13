import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class CreateUserDto {



    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @IsString()
    @MinLength(3, { message: "Username must be at least 3 characters long" })
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;



}