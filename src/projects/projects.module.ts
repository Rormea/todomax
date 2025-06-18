import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';


@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    TypeOrmModule.forFeature([
      Project
    ])
    // Other modules can be imported here if needed
  ],
  exports: [ProjectsService], // Export the service if it needs to be used in other modules
})
export class ProjectsModule {}
