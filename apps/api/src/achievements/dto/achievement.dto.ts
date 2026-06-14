import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class CreateAchievementDto {
  @ApiProperty({ example: 'Juara 1 Hackathon Nasional', description: 'Judul pencapaian' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Memenangkan kompetisi hackathon tingkat nasional...', description: 'Deskripsi pencapaian' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Kemenkominfo', description: 'Penerbit/penyelenggara sertifikat' })
  @IsOptional()
  @IsString()
  issuer?: string;

  @ApiProperty({ example: '2025-06-01', description: 'Tanggal pencapaian (format ISO 8601)' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ example: true, description: 'Apakah pencapaian ini diunggulkan' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: 1, description: 'Urutan tampilan' })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class UpdateAchievementDto {
  @ApiPropertyOptional({ example: 'Juara 1 Hackathon Nasional 2025', description: 'Judul pencapaian' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Update deskripsi pencapaian...', description: 'Deskripsi pencapaian' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Kemenkominfo RI', description: 'Penerbit/penyelenggara sertifikat' })
  @IsOptional()
  @IsString()
  issuer?: string;

  @ApiPropertyOptional({ example: '2025-07-15', description: 'Tanggal pencapaian (format ISO 8601)' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ example: false, description: 'Apakah pencapaian ini diunggulkan' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: 2, description: 'Urutan tampilan' })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class FindAchievementsQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter pencapaian unggulan (true/false)',
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  featured?: boolean;
}