import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TechCategory } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FilePipe } from '../upload/pipes/file.pipe';
import { TechStackService } from './tech-stack.service';
import { CreateTechStackDto, UpdateTechStackDto } from './dto/tech-stack.dto';

@ApiTags('Tech Stacks')
@Controller('tech-stacks')
export class TechStackController {
  constructor(private techStackService: TechStackService) {}

  @Get()
  @ApiOperation({ summary: 'Mengambil semua data tech stack, opsional filter berdasarkan kategori' })
  @ApiQuery({ name: 'category', enum: TechCategory, required: false, description: 'Filter kategori teknologi' })
  @ApiResponse({ status: 200, description: 'Daftar tech stack berhasil diambil.' })
  findAll(@Query('category') category?: TechCategory) {
    return this.techStackService.findAll(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mengambil satu data tech stack berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID dari tech stack' })
  @ApiResponse({ status: 200, description: 'Data tech stack ditemukan.' })
  @ApiResponse({ status: 404, description: 'Tech stack tidak ditemukan.' })
  findOne(@Param('id') id: string) {
    return this.techStackService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Membuat tech stack baru (Admin)' })
  @ApiResponse({ status: 201, description: 'Tech stack berhasil dibuat.' })
  @ApiResponse({ status: 401, description: 'Unauthorized / Token tidak valid.' })
  create(@Body() dto: CreateTechStackDto) {
    return this.techStackService.create(dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post(':id/icon')
  @UseInterceptors(FileInterceptor('file', { storage: undefined })) // memory storage
  @ApiOperation({ summary: 'Mengupload/mengganti icon file untuk tech stack (Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File gambar icon (JPEG, PNG, WebP, SVG; maks 2MB)',
        },
      },
      required: ['file'],
    },
  })
  @ApiParam({ name: 'id', description: 'ID dari tech stack' })
  @ApiResponse({ status: 200, description: 'Icon berhasil diupload.' })
  @ApiResponse({ status: 400, description: 'Format file tidak didukung atau ukuran terlalu besar.' })
  @ApiResponse({ status: 401, description: 'Unauthorized / Token tidak valid.' })
  @ApiResponse({ status: 404, description: 'Tech stack tidak ditemukan.' })
  uploadIcon(
    @Param('id') id: string,
    @UploadedFile(new FilePipe({ maxSizeMb: 2, allowedMimes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'] }))
    file: Express.Multer.File,
  ) {
    return this.techStackService.uploadIcon(id, file);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Mengupdate data tech stack berdasarkan ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID dari tech stack' })
  @ApiResponse({ status: 200, description: 'Tech stack berhasil diupdate.' })
  @ApiResponse({ status: 401, description: 'Unauthorized / Token tidak valid.' })
  @ApiResponse({ status: 404, description: 'Tech stack tidak ditemukan.' })
  update(@Param('id') id: string, @Body() dto: UpdateTechStackDto) {
    return this.techStackService.update(id, dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus tech stack berdasarkan ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID dari tech stack' })
  @ApiResponse({ status: 200, description: 'Tech stack berhasil dihapus.' })
  @ApiResponse({ status: 401, description: 'Unauthorized / Token tidak valid.' })
  @ApiResponse({ status: 404, description: 'Tech stack tidak ditemukan.' })
  remove(@Param('id') id: string) {
    return this.techStackService.remove(id);
  }
}