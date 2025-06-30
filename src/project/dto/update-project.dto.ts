import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;  
}
