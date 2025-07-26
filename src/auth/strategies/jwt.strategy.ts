import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interface/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // solo con las lineas de arriba ya validé si el token es vigente 
    // y hace match la firma con el payload , ahora entra a mi función de validación 

    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService:ConfigService
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }


    async validate(payload: JwtPayload): Promise<User> {
        
       const {email} = payload;

        const user = await this.userRepository.findOneBy({email})

        if(!user) throw new UnauthorizedException('Token no valid')

        if(!user.isActive) throw new UnauthorizedException('User is inactive')

        if(!user.isVerified) throw new UnauthorizedException(' Unverified user, please request verification token again. ')
        
        return user;
        // poniendo el return aqui del user lograré que lo que retrna se adjunte a la Request
    }
	
}