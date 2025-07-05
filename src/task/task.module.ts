import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task])],
  // si bien en el app modulo se ha configurado el autoLoadEntities: true,
  // es una buena práctica importar las entidades en cada módulo que las necesite.
  // importante para habilitar la inyección de repositorios en un módulo específico.

})
export class TaskModule {}
