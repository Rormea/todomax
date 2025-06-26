import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProjectsService {

  private readonly logger = new Logger('ProjectsService');

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ){}


  async create(createProjectDto: CreateProjectDto) {
    
    try {

      const project = this.projectRepository.create(createProjectDto);
      await this.projectRepository.save(project);
      return project;
      
    } catch (error) {
      //console.log(error)
      this.handleErrorDb(error);
    }
  };


  async findAll() {
    try {
      const allProjects = await this.projectRepository.find();
      return allProjects;
    } catch (error) {
      this.handleErrorDb(error);
    }
  };

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async inactiveProject(id: string) {
    
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new BadRequestException(`Project with id ${id} not found`);
    }

    try {
      await this.projectRepository.update(id, { isActive: false });
      return { message: `Project with id ${id} has been deactivated` };
      
    } catch (error) {
      this.handleErrorDb(error);
      
    }
  };

/*   async remove(id: string) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new BadRequestException(`Project with id ${id} not found`);
    }
    try {
      await this.projectRepository.delete(id);
      return { message: `Project with id ${id} has been deleted` };
      
    } catch (error) {
      this.handleErrorDb(error);
    }
  }; */


  private handleErrorDb(error: any) {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    //console.log(error)
    throw new InternalServerErrorException('An error occurred while processing your request');
  };

}
