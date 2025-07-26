import { SignOptions } from './../../node_modules/@types/jsonwebtoken/index.d';

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TokenService } from './token.service';
import { TokenUser } from './entities/token.entity';
import { EmailModule } from 'src/email/email.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy],
    imports: [

      ConfigModule,

      TypeOrmModule.forFeature([User, TokenUser]),

      PassportModule.register({ defaultStrategy: 'jwt' }),

      JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: (configService: ConfigService) => {
          //console.log('JWT Causa', process.env.JWT_SECRET)
          //console.log('Jwt ConfigService', configService.get('JWT_SECRET') )
          return{
            secret: configService.get('JWT_SECRET'),
            signOptions:{
              expiresIn: '2h'
            }
          }
        }
      }),

      EmailModule

  ],
  exports: [
    AuthService,
    TypeOrmModule,
    TokenService,
    JwtStrategy, 
    PassportModule,
    JwtModule
  ], 
})
export class AuthModule {}
