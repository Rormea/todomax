import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import {validate as IsUUID} from 'uuid'
import { HandleErrorDbUtil } from 'src/common';


@Injectable()
export class TaskService {



    constructor(
      @InjectRepository(Task)
      private readonly tasksRepository: Repository<Task>,
      @InjectRepository(Project)
      private readonly projectRepository: Repository<Project>
    ){}


  async checkProjectActive(projectId: string): Promise<Project> {

      if(!IsUUID(projectId)) {
        throw new BadRequestException(`Invalid project ID format: ${projectId}`);
      }

    try {

      const project = await this.projectRepository.findOne({
        where: { id: projectId, isActive: true },
      });

      if (!project) {
        throw new BadRequestException(`Project with ID ${projectId} does not exist or is inactive.`);
      }
      return project;

    } catch (error) {
      HandleErrorDbUtil.handle(error);
    }
  };

  async createTask( projectId: string,createTaskDto: CreateTaskDto) {
    try {
      // Check if the project is active
      const project = await this.checkProjectActive(projectId);
      
      // Create a new task instance
      const task = this.tasksRepository.create(createTaskDto);
      
      // Assign the project entity to the task
      const taskPlusProjectId = {
        ...task,
        projectId: Object.values(project)[0] // Assign the project entity to the task
      };
      
      // Save the task to the database
      return this.tasksRepository.save(taskPlusProjectId);
    } catch (error) {
      HandleErrorDbUtil.handle(error);
      
    }
  };

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }


}
