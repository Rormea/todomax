import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { TokenUser } from './entities/token.entity';
import { randomBytes } from "crypto";
import { HandleErrorDbUtil } from "src/common";
import { TokenUserDto } from "./dto/token.dto";




@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(TokenUser) private readonly tokenRepository: Repository<TokenUser>
        
    ){}


    // ⭐Generate and save a new toke⭐
    async generateAndSaveToken(user:User){
        
/*         const existingToken = await this.tokenRepository.findOneBy({token})

        if(existingToken){ await this.tokenRepository.remove(existingToken)} */

        // ⭐Generate token with 4 digits ⭐
         const tokenString = randomBytes(3).toString('hex').slice(0, 6).toUpperCase(); // 2 bytes -> 6 caracteres hex

         const newToken = this.tokenRepository.create({
            token: tokenString,
            user: user
         })

         try {
            await this.tokenRepository.save(newToken)
            return newToken.token
         } catch (error) {
            HandleErrorDbUtil.handle(error)
         }
    };
}