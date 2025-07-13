import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { HandleErrorDbUtil, SearchTermDto } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ILike, In, Not, Repository } from 'typeorm';
import {validate as IsUUID} from 'uuid'

@Injectable()
export class ProjectsService {



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
      HandleErrorDbUtil.handle(error)
    }
  };


  async findAll() {
    try {
      const allProjects = await this.projectRepository.find();
      return allProjects;
    } catch (error) {
      HandleErrorDbUtil.handle(error)
    }
  };


  async findByTerm(SearchTermDto: SearchTermDto): Promise<Project[]> {
        if (!SearchTermDto) throw new BadRequestException('Search term is required');

      try {
        //const  searchPattern = `%${SearchTermDto.searchTerm.toLowerCase()}%`;
        //el dto con su validator ya lo está pasando a minLength 3 y a lowerCase
        const  searchPattern = `%${SearchTermDto.searchTerm}%`;
        const projects = await this.projectRepository.find({
          where: [
            { projectName: ILike(searchPattern) },
            { clientName: ILike(searchPattern) },
          ],
          order: {
            createdAt: 'DESC',
          },
        })
        //console.log(projects)
  
        return projects
      
      } catch (error) {
        HandleErrorDbUtil.handle(error)
      }
  };

    async findOneID(id: string){
    try {
      if (!IsUUID(id)) {
        throw new BadRequestException(`Invalid UUID format: ${id}`);
      }
      
      const project = await this.projectRepository.findOneBy({ id });
      if (!project) {
        throw new BadRequestException(`Project with id ${id} not found`);
      }
      return project;
      
    } catch (error) {
      HandleErrorDbUtil.handle(error)
    }
  };

  

  async update(id: string, updateProjectDto: UpdateProjectDto) {

    const projectsExist = await this.findOneID(id);

    if(projectsExist.isActive === false) {
      throw new BadRequestException(`Cannot update project with id ${id} because it is inactive`);
    }
    
    try {

        const project = await this.projectRepository.preload({
        id: id,
        ...updateProjectDto,
      });
      
      await this.projectRepository.save(project);
      return project;
      
    } catch (error) {
      HandleErrorDbUtil.handle(error)
    }
  };




  async hardRemove(id: string) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    try {
      await this.projectRepository.delete(id);
      return { message: `Project with id ${id} has been deleted` };
      
    } catch (error) {
      HandleErrorDbUtil.handle(error)
    }
  };

   async inactiveProject(id: string) {
    
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    try {
      await this.projectRepository.update(id, { isActive: false });
      return { message: `Project with id ${id} has been deactivated` };
      
    } catch (error) {
      HandleErrorDbUtil.handle(error)
      
    }
  };


}
