import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true, // Strip properties that do not have any decorators
        forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
        disableErrorMessages: false, // Enable error messages for validation failures
      })
    );
   
 
  // Enable CORS with specific configurations
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type, Accept', // Allow specific headers
    credentials: true, // Allow credentials
    preflightContinue: false, // Do not pass the preflight response to the next handler
    optionsSuccessStatus: 204, // Use 204 for successful preflight requests
    maxAge: 86400, // Cache preflight response for 24 hours
  });

  //Swageer configuration
   const config = new DocumentBuilder()
    .setTitle('TodoMax RESTfullAPI')
    .setDescription('TodoMax API description')
    .setVersion('1.0')
    .addTag('')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3007);
}
bootstrap();
