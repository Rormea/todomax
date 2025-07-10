import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProjectsModule } from 'src/project/projects.module';



@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    TypeOrmModule.forFeature([Task]),
    ProjectsModule
],
  // si bien en el app modulo se ha configurado el autoLoadEntities: true,
  // es una buena práctica importar las entidades en cada módulo que las necesite.
  // importante para habilitar la inyección de repositorios en un módulo específico.
  exports: [TaskService], // Export the service if it needs to be used in other modules

})
export class TaskModule {}
