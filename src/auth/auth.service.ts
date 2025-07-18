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


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService
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
      // ⭐Aqui trer el servicio de generar token ⭐
      this.tokenService.generateAndSaveToken(user)
       // Remove passConfirm from the user object 
      await this.userRepository.save(user);
      delete user.password; // Remove password from the response for security
      return user;

      //TODO: Enviar mail de confirmación de token 

      //TODO: return JWT token

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

     
      return user; // TODO: return JWT token
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
}
