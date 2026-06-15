import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import {
  SubmitContactDto,
  UpdateContactStatusDto,
  FindContactsQueryDto,
} from './dto/contact.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Throttle({ default: { limit: 3, ttl: 300000 } })
  @Post()
  @ApiOperation({ summary: 'Mengirim formulir kontak baru (Publik)' })
  @ApiCreatedResponse({ description: 'Formulir kontak berhasil dikirim.' })
  @ApiResponse({ status: 400, description: 'Payload tidak valid.' })
  create(@Body() submitContactDto: SubmitContactDto) {
    return this.contactService.create(submitContactDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Mengambil semua data formulir kontak dengan filter & pagination (Admin)' })
  @ApiOkResponse({ description: 'Daftar formulir kontak berhasil diambil.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Query() query: FindContactsQueryDto) {
    return this.contactService.findAll(query);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Mengambil satu detail formulir kontak berdasarkan ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari formulir kontak' })
  @ApiOkResponse({ description: 'Data formulir kontak ditemukan.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Formulir kontak tidak ditemukan.' })
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Mengupdate status formulir kontak berdasarkan ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari formulir kontak' })
  @ApiOkResponse({ description: 'Status formulir kontak berhasil diupdate.' })
  @ApiResponse({ status: 400, description: 'Payload tidak valid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Formulir kontak tidak ditemukan.' })
  update(
    @Param('id') id: string,
    @Body() updateContactStatusDto: UpdateContactStatusDto,
  ) {
    return this.contactService.update(id, updateContactStatusDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus data formulir kontak berdasarkan ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID UUID dari formulir kontak' })
  @ApiOkResponse({ description: 'Formulir kontak berhasil dihapus.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Formulir kontak tidak ditemukan.' })
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
