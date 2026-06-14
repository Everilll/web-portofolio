import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  FindProjectsQueryDto,
} from './dto/project.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FilePipe } from '../upload/pipes/file.pipe';

const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp'];
const DOC_MIMES = [...IMAGE_MIMES, 'application/pdf'];

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Membuat project baru (Admin)' })
  @ApiCreatedResponse({ description: 'Project berhasil dibuat.' })
  @ApiResponse({ status: 400, description: 'Payload tidak valid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua data project dengan filter & pagination' })
  @ApiOkResponse({ description: 'Daftar project berhasil diambil.' })
  findAll(@Query() query: FindProjectsQueryDto) {
    return this.projectsService.findAll(query);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Mengambil satu data project berdasarkan slug' })
  @ApiParam({ name: 'slug', description: 'Slug dari project' })
  @ApiOkResponse({ description: 'Data project ditemukan.' })
  @ApiResponse({ status: 404, description: 'Project tidak ditemukan.' })
  findBySlug(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mengambil satu data project berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID UUID dari project' })
  @ApiOkResponse({ description: 'Data project ditemukan.' })
  @ApiResponse({ status: 404, description: 'Project tidak ditemukan.' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post(':id/thumbnail')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File gambar thumbnail (JPEG, PNG, WebP; maks 2MB)',
        },
      },
      required: ['file'],
    },
  })
  @ApiOperation({ summary: 'Upload thumbnail project (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari project' })
  @ApiOkResponse({ description: 'Thumbnail berhasil diupload.' })
  @ApiResponse({ status: 400, description: 'Format file tidak didukung atau melebihi batas ukuran.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Project tidak ditemukan.' })
  uploadThumbnail(
    @Param('id') id: string,
    @UploadedFile(new FilePipe({ maxSizeMb: 2, allowedMimes: IMAGE_MIMES }))
    file: Express.Multer.File,
  ) {
    return this.projectsService.uploadThumbnail(id, file);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post(':id/docs')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Daftar file gambar dokumentasi atau PDF (maks 5MB per file)',
        },
      },
      required: ['files'],
    },
  })
  @ApiOperation({ summary: 'Upload banyak file dokumentasi/PDF project (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari project' })
  @ApiOkResponse({ description: 'Dokumen berhasil diupload.' })
  @ApiResponse({ status: 400, description: 'File tidak diunggah atau tidak valid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Project tidak ditemukan.' })
  uploadDocs(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    // Validasi manual array karena NestJS pipe bawaan memproses per item file
    files.forEach((f) => {
      if (f.size > 5 * 1024 * 1024) {
        throw new BadRequestException(`${f.originalname} exceeds 5MB`);
      }
      if (!DOC_MIMES.includes(f.mimetype)) {
        throw new BadRequestException(`${f.originalname} type not allowed`);
      }
    });
    return this.projectsService.uploadDocs(id, files);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id/docs/:docId')
  @ApiOperation({ summary: 'Menghapus satu file dokumentasi project (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari project' })
  @ApiParam({ name: 'docId', description: 'ID UUID dari document' })
  @ApiOkResponse({ description: 'Dokumen berhasil dihapus.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Project atau dokumen tidak ditemukan.' })
  deleteDoc(@Param('id') id: string, @Param('docId') docId: string) {
    return this.projectsService.deleteDoc(id, docId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Mengupdate data project berdasarkan ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari project' })
  @ApiOkResponse({ description: 'Project berhasil diupdate.' })
  @ApiResponse({ status: 400, description: 'Payload tidak valid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Project tidak ditemukan.' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus project beserta semua medianya (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari project' })
  @ApiOkResponse({ description: 'Project berhasil dihapus.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Project tidak ditemukan.' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
