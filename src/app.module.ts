import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, parse } from 'path';
import { Project } from './project/entities/project.entity';
import { ProjectsModule } from './project/projects.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5423,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Automatically load entities from the current directory
      synchronize: true,
    }),

     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Serve static files from the 'public' directory
       // Optional, can be used to change the URL prefix
    }),
    ProjectsModule,
    TaskModule,
    AuthModule,
  ],
})
export class AppModule {}
