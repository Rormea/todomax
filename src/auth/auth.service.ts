import { UserWhitespacable } from './../../node_modules/@babel/types/lib/index-legacy.d';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HandleErrorDbUtil } from 'src/common';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { TokenUser } from './entities/token.entity';
import { TokenService } from './token.service';
import { EmailService } from 'src/email/email.service';
import { TokenUserDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService

  ) {}

  async creatUser(createUserDto: CreateUserDto) {

    const { password, passConfirm, ...restCreateDto } = createUserDto;

      if (password !== passConfirm) {
        throw new UnauthorizedException('Passwords do not match');
      }

    
    try {

      const user = this.userRepository.create({
        ...restCreateDto,
        password: bcrypt.hashSync(password, 10) // Hash the password before saving
      });

      await this.userRepository.save(user);
      delete user.password;
      // Remove password from the response for securityd

      // ⭐Aqui trer el servicio de generar token ⭐
      const token =  await this.tokenService.generateAndSaveToken(user)
      console.log(token)
      
      // ⭐Aqui trer el servicio de envío de email de verificación de token⭐
      await this.emailService.sendVerificationEmail(user, token)


      //TODO: return JWT token
      const jwtToken = this.getJwtToken({email: user.email})

     const userAppendJwtToken = {...user,jwtToken }

      return userAppendJwtToken; 


    } catch (error) {
      HandleErrorDbUtil.handle(error);
    }
  };

  async loginUser(loginUserDto: LoginUserDto) {

      const { email, password } = loginUserDto;

      const user = await this.userRepository.findOne({
         where: { email },
         select: {email: true, password: true} // Select only necessary fields
      });
      

      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials');
      }

     // TODO: return JWT token
    const jwtToken = this.getJwtToken({email: user.email})

     const userAppendJwtToken = {...user,jwtToken }

      return userAppendJwtToken; 
  };  

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

/*   update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  } */

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }


    private getJwtToken ( jwtPayload: JwtPayload){

        const jwtToken = this.jwtService.sign(jwtPayload);

        return jwtToken;
    }

}
