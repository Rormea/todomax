
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { SearchTermDto } from 'src/common';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('search')
  findByTerm(@Query() searchTermDto: SearchTermDto): Promise<Project[]> {
    return this.projectsService.findByTerm(searchTermDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOneID(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete('soft/:id')
  inactiveProject(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.inactiveProject(id);
  }

  @Delete('hard/:id')
  hardRemove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.hardRemove(id);
  };

}

