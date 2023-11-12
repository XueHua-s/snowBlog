import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MinioClientService {
  constructor(
    private readonly minio: MinioService,
    private configService: ConfigService,
  ) {}
  get client() {
    return this.minio.client;
  }
  async upload(
    {
      file,
      // 桶的名字
      baseBucket = this.configService.get('MINIO_BUCKET'),
    }: {
      file: any;
      baseBucket?: string;
    },
    path: string,
  ) {
    // 转换文件名中的中文
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const temp_fileName = file.originalname;
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_fileName)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const filename = hashedFileName + new Date().getTime() + ext;

    const fileName = `${filename}`;
    const fileBuffer = file.buffer;

    return new Promise<any>((resolve) => {
      // 调用minio的保存方法
      this.client.putObject(baseBucket, fileName, fileBuffer, async (err) => {
        if (err) {
          throw new HttpException('Error upload file', HttpStatus.BAD_REQUEST);
        }
        resolve(`${path}/${fileName}`);
      });
    });
  }
  async getFile(filename: string) {
    try {
      const data = await new Promise((resolve, reject) => {
        this.client.getObject(
          this.configService.get('MINIO_BUCKET'),
          filename,
          (err, dataStream) => {
            if (err) {
              console.log(err, '错误');
              reject(err);
              throw new HttpException('没有此文件', 404);
            }
            const chunks = [];
            // 将数据流转换成Buffer
            dataStream.on('data', (chunk) => {
              chunks.push(chunk);
            });
            dataStream.on('end', function () {
              const buffer = Buffer.concat(chunks);
              resolve(buffer);
            });
            // dataStream.on('end', () => {
            //   const buffer = Buffer.concat(chunks);
            //
            //   // 将Buffer转换为Base64字符串
            //   const base64String = buffer.toString('base64');
            //   console.log('返回图片');
            //
            //   // 将Base64字符串作为JSON响应发送回客户端
            //   return res.send({ data: 'data:image/png;base64,' + base64String });
            // });
          },
        );
      });
      return data;
    } catch (err) {
      throw new HttpException('错误', 500);
    }
  }
}
