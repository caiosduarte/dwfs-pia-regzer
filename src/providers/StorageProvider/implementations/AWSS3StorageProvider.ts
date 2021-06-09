import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";
import upload from "../../../config/upload";
import IStorageProvider from "../IStorageProvider";

export default class AWSS3StorageProvider implements IStorageProvider {
    private client: S3;
    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    private static INSTANCE: AWSS3StorageProvider;

    static getInstance(): AWSS3StorageProvider {
        if (!AWSS3StorageProvider.INSTANCE) {
            AWSS3StorageProvider.INSTANCE = new AWSS3StorageProvider();
        }
        return AWSS3StorageProvider.INSTANCE;
    }

    async save(
        folder: string,
        file: string,
        mimetype?: string
    ): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
                ACL: "public-read",
                Body: fileContent,
                ContentType:
                    mimetype || mime.getType(originalName) || "image/jpeg",
            })
            .promise();

        await fs.promises.unlink(originalName);

        return file;
    }

    async delete(folder: string, file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
            })
            .promise();
    }

    getUrl(folder: string, file: string): string {
        return `${process.env.AWS_BUCKET_URL}/${folder}/${file}`;
    }
}
