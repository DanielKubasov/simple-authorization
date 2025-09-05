import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
    private client: S3Client;
    private bucketName = '';

    public constructor(private readonly configService: ConfigService) {
        const accessKey =
            this.configService.getOrThrow<string>('S3_ACCESS_KEY');
        const secretAccessKey = this.configService.getOrThrow<string>(
            'S3_SECRET_ACCESS_KEY',
        );
        const region = this.configService.getOrThrow('S3_REGION');
        const endpoint = this.configService.getOrThrow('S3_ENDPOINT');
        const bucketName = this.configService.getOrThrow('S3_BUCKET_NAME');

        this.bucketName = bucketName;

        this.client = new S3Client({
            region,
            endpoint,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretAccessKey,
            },
            forcePathStyle: true,
        });
    }

    public async uploadSingleFile({
        file,
        isPublic = true,
    }: {
        file: Express.Multer.File;
        isPublic: boolean;
    }) {
        try {
            const key = `${uuidv4()}`;
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: isPublic ? 'public-read' : 'private',

                Metadata: {
                    originalName: file.originalname,
                },
            });

            await this.client.send(command);

            return {
                url: isPublic
                    ? (await this.getFileUrl(key)).url
                    : (await this.getFileUrl(key)).url,
                key,
                isPublic,
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getFileUrl(key: string) {
        const hostname = this.configService.getOrThrow<string>('S3_ENDPOINT');
        return { url: `${hostname}/${key}` };
    }

    public async deleteFile(key: string) {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });

            await this.client.send(command);

            return { message: 'File deleted successfully' };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
