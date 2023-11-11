import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    //文档的标题
    .setTitle('雪花博客')
    //文档描述
    .setDescription('雪花博客文档')
    .setVersion('V1.0')
    .addBearerAuth() // 增加鉴权功能
    .build();

  const document = SwaggerModule.createDocument(app, options);
  //访问文档的URL
  SwaggerModule.setup('/api/doc', app, document);
};
