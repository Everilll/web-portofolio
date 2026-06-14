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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FilePipe } from '../upload/pipes/file.pipe';
import { AchievementsService } from './achievements.service';
import {
  CreateAchievementDto,
  UpdateAchievementDto,
  FindAchievementsQueryDto,
} from './dto/achievement.dto';

@ApiTags('Achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private achievementsService: AchievementsService) {}

  @Get()
  @ApiOperation({ summary: 'Mengambil semua data pencapaian dengan filter & pagination' })
  @ApiOkResponse({ description: 'Daftar pencapaian berhasil diambil.' })
  findAll(@Query() query: FindAchievementsQueryDto) {
    return this.achievementsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mengambil satu data pencapaian berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID UUID dari pencapaian' })
  @ApiOkResponse({ description: 'Data pencapaian ditemukan.' })
  @ApiResponse({ status: 404, description: 'Pencapaian tidak ditemukan.' })
  findOne(@Param('id') id: string) {
    return this.achievementsService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Membuat pencapaian baru (Admin)' })
  @ApiCreatedResponse({ description: 'Pencapaian berhasil dibuat.' })
  @ApiResponse({ status: 400, description: 'Payload tidak valid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() dto: CreateAchievementDto) {
    return this.achievementsService.create(dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post(':id/certificate')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File sertifikat (JPEG, PNG, WebP, atau PDF; maks 5MB)',
        },
      },
      required: ['file'],
    },
  })
  @ApiOperation({ summary: 'Upload/ganti file sertifikat pencapaian (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari pencapaian' })
  @ApiOkResponse({ description: 'Sertifikat berhasil diupload.' })
  @ApiResponse({ status: 400, description: 'Format file tidak didukung atau melebihi batas ukuran.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Pencapaian tidak ditemukan.' })
  uploadCertificate(
    @Param('id') id: string,
    @UploadedFile(
      new FilePipe({
        maxSizeMb: 5,
        allowedMimes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.achievementsService.uploadCertificate(id, file);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Mengupdate data pencapaian berdasarkan ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari pencapaian' })
  @ApiOkResponse({ description: 'Pencapaian berhasil diupdate.' })
  @ApiResponse({ status: 400, description: 'Payload tidak valid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Pencapaian tidak ditemukan.' })
  update(@Param('id') id: string, @Body() dto: UpdateAchievementDto) {
    return this.achievementsService.update(id, dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus pencapaian beserta file sertifikatnya (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari pencapaian' })
  @ApiOkResponse({ description: 'Pencapaian berhasil dihapus.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Pencapaian tidak ditemukan.' })
  remove(@Param('id') id: string) {
    return this.achievementsService.remove(id);
  }
}