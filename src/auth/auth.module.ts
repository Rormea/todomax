import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TokenService } from './token.service';
import { TokenUser } from './entities/token.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService],
    imports: [
      TypeOrmModule.forFeature([User, TokenUser]),
  ],
  exports: [
    AuthService,
    TypeOrmModule,
    TokenService
  ], 
})
export class AuthModule {}
