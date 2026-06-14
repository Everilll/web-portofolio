import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

interface FilePipeOptions {
  maxSizeMb?: number;
  allowedMimes?: string[];
}

@Injectable()
export class FilePipe implements PipeTransform {
  constructor(private options: FilePipeOptions = {}) {}

  transform(file: Express.Multer.File) {
    const { maxSizeMb = 5, allowedMimes } = this.options;

    // Jika file opsional, pastikan di-handle di luar atau ubah logika ini
    if (!file) throw new BadRequestException('File is required');

    const maxBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      // IMPROVISASI: Menampilkan ukuran asli file pengguna agar lebih informatif
      const userFileSize = (file.size / 1024 / 1024).toFixed(2);
      throw new BadRequestException(
        `File size exceeds ${maxSizeMb}MB limit. Your file: ${userFileSize}MB`,
      );
    }

    if (allowedMimes && !allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type not allowed. Allowed types: ${allowedMimes.join(', ')}`,
      );
    }

    return file;
  }
}
