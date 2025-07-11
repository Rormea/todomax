import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';


@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [TypeOrmModule.forFeature([Project])],
  exports: [
    ProjectsService, // Export the service if it needs to be used in other modules
    TypeOrmModule.forFeature([Project]) // Export the repository for use in other modules
  ], // Export the service if it needs to be used in other modules
})
export class ProjectsModule {}
