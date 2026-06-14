import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { ProjectStatus } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Awesome Portfolio', description: 'Judul project' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Sebuah website portfolio yang dibangun dengan...', description: 'Deskripsi singkat project' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'Penjelasan panjang mengenai detail arsitektur...', description: 'Deskripsi panjang detail project' })
  @IsOptional()
  @IsString()
  longDesc?: string;

  @ApiPropertyOptional({ example: 'https://myportfolio.com', description: 'URL website live' })
  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @ApiPropertyOptional({ example: 'https://github.com/user/repo', description: 'URL repository code' })
  @IsOptional()
  @IsUrl()
  repoUrl?: string;

  @ApiPropertyOptional({ enum: ProjectStatus, example: ProjectStatus.DRAFT, description: 'Status publikasi project' })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional({ example: false, description: 'Apakah project ini diunggulkan' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: 1, description: 'Urutan tampilan project' })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({ type: [String], example: ['uuid-tech-1', 'uuid-tech-2'], description: 'Daftar ID tech stack' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStackIds?: string[];
}

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'My Awesome Portfolio v2', description: 'Judul project' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Pembaruan deskripsi singkat project', description: 'Deskripsi singkat project' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Pembaruan penjelasan panjang detail project...', description: 'Deskripsi panjang detail project' })
  @IsOptional()
  @IsString()
  longDesc?: string;

  @ApiPropertyOptional({ example: 'https://myportfolio-v2.com', description: 'URL website live' })
  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @ApiPropertyOptional({ example: 'https://github.com/user/repo-v2', description: 'URL repository code' })
  @IsOptional()
  @IsUrl()
  repoUrl?: string;

  @ApiPropertyOptional({ enum: ProjectStatus, example: ProjectStatus.PUBLISHED, description: 'Status publikasi project' })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional({ example: true, description: 'Apakah project ini diunggulkan' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: 2, description: 'Urutan tampilan project' })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({ type: [String], example: ['uuid-tech-1'], description: 'Daftar ID tech stack' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStackIds?: string[];
}

export class FindProjectsQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter project unggulan (true/false)',
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({
    enum: ProjectStatus,
    description: 'Filter status publikasi project',
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;
}