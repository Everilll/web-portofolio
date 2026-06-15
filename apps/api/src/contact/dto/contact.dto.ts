import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ContactStatus } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class SubmitContactDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nama pengirim pesan',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Alamat email pengirim',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    example: 'Google Inc.',
    description: 'Nama perusahaan pengirim (opsional)',
  })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({
    example: 'Pertanyaan tentang Kerjasama',
    description: 'Subjek pesan',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  subject: string;

  @ApiProperty({
    example: 'Halo, saya ingin mendiskusikan proyek pembuatan website...',
    description: 'Isi pesan yang dikirim',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(2000)
  message: string;
}

export class UpdateContactStatusDto {
  @ApiProperty({
    enum: ContactStatus,
    example: ContactStatus.READ,
    description: 'Status baru dari formulir kontak',
  })
  @IsEnum(ContactStatus)
  status: ContactStatus;
}

export class FindContactsQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: ContactStatus,
    description: 'Filter berdasarkan status formulir kontak',
  })
  @IsOptional()
  @IsEnum(ContactStatus)
  status?: ContactStatus;
}