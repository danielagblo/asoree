import { env } from '../config/env'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'

export interface IStorageService {
  upload(filename: string, buffer: Buffer, mimetype: string): Promise<string>
  delete(url: string): Promise<void>
}

class DatabaseStorage implements IStorageService {
  async upload(_filename: string, buffer: Buffer, mimetype: string): Promise<string> {
    const base64 = buffer.toString('base64')
    return `data:${mimetype};base64,${base64}`
  }

  async delete(_url: string): Promise<void> {
    // no-op: base64 is embedded in the DB row, will be overwritten on update
  }
}

class S3Storage implements IStorageService {
  private client: S3Client
  private bucket: string
  private publicUrl: string

  constructor() {
    this.client = new S3Client({
      endpoint: env.s3.endpoint,
      region: env.s3.region,
      credentials: {
        accessKeyId: env.s3.accessKeyId,
        secretAccessKey: env.s3.secretAccessKey,
      },
      forcePathStyle: true,
    })
    this.bucket = env.s3.bucket
    this.publicUrl = env.s3.publicUrl.replace(/\/$/, '')
  }

  async upload(filename: string, buffer: Buffer, mimetype: string): Promise<string> {
    const key = `products/${Date.now()}-${filename}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
      })
    )

    return `${this.publicUrl}/${key}`
  }

  async delete(url: string): Promise<void> {
    const key = url.replace(`${this.publicUrl}/`, '')
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    )
  }
}

function createStorageService(): IStorageService {
  if (env.imageStorage === 's3') {
    if (!env.s3.endpoint || !env.s3.accessKeyId || !env.s3.secretAccessKey || !env.s3.bucket) {
      throw new Error('S3 storage selected but missing S3_* env vars')
    }
    return new S3Storage()
  }
  return new DatabaseStorage()
}

export const storageService = createStorageService()
