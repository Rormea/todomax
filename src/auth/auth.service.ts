import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HandleErrorDbUtil } from 'src/common';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async creatUser(createUserDto: CreateUserDto) {
    
    try {

      const {password, ...restCreateDto} = createUserDto;

      const user = this.userRepository.create({
        ...restCreateDto,
        password: bcrypt.hashSync(password, 10) // Hash the password before saving
      });
      await this.userRepository.save(user);
      delete user.password; // Remove password from the response for security
      return user;

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
