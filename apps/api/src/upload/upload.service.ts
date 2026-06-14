import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
    constructor(config: ConfigService) {
        cloudinary.config({
            cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
            api_key: config.get('CLOUDINARY_API_KEY'),
            api_secret: config.get('CLOUDINARY_API_SECRET'),
        });
    }

    async uploadFile(
        file: Express.Multer.File,
        folder: string,
    ): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder,
                    resource_type: 'auto',
                    transformation: [
                        { width: 1080, crop: 'limit' },
                        { quality: 'auto' },
                        { fetch_format: 'auto' },
                    ],
                },
                (error, result) => {
                    if (error || !result) return reject(error);
                    resolve(result);
                },
            );
            Readable.from(file.buffer).pipe(upload);
        });
    }

    async deleteFile(publicId: string): Promise<void> {
        await cloudinary.uploader.destroy(publicId);
    }

    extractPublicId(url: string): string {
        const parts = url.split('/');
        const uploadIdx = parts.indexOf('upload');
        const withExt = parts.slice(uploadIdx + 2).join('/');
        return withExt.replace(/\.[^/.]+$/, '');
    }
}