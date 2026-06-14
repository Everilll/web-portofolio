import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { TechCategory } from '@prisma/client';

export class CreateTechStackDto {
  @ApiProperty({ example: 'React', description: 'Nama teknologi' })
  @IsString()
  name: string;

  @ApiProperty({
    enum: TechCategory,
    example: TechCategory.FRONTEND,
    description: 'Kategori teknologi',
  })
  @IsEnum(TechCategory)
  category: TechCategory;

  @ApiPropertyOptional({
    example: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description: 'URL icon teknologi',
  })
  @IsOptional()
  @IsUrl()
  iconUrl?: string;

  @ApiPropertyOptional({ example: 1, description: 'Urutan tampilan' })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdateTechStackDto {
  @ApiPropertyOptional({ example: 'React Native', description: 'Nama teknologi' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    enum: TechCategory,
    example: TechCategory.MOBILE,
    description: 'Kategori teknologi',
  })
  @IsOptional()
  @IsEnum(TechCategory)
  category?: TechCategory;

  @ApiPropertyOptional({
    example: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description: 'URL icon teknologi',
  })
  @IsOptional()
  @IsUrl()
  iconUrl?: string;

  @ApiPropertyOptional({ example: 2, description: 'Urutan tampilan' })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}