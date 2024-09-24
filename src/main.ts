import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Esto habilita la transformación automática de los tipos (class-transformer)
      whitelist: true, // Remueve propiedades que no están definidas en los DTOs
    }),
  );

  // Configuración de Swagger para documentar la API
  const config = new DocumentBuilder()
    .setTitle('API de Gestión de Herramientas')
    .setDescription(
      'Esta API permite gestionar el inventario y las operaciones relacionadas con herramientas. Proporciona endpoints para agregar, eliminar, actualizar y consultar herramientas en el sistema.',
    )
    .setVersion('1.0.0')
    .addTag('herramientas', 'Endpoints relacionados con herramientas')
    .addTag(
      'categorías',
      'Endpoints relacionados con las categorías de herramientas',
    )
    .addBearerAuth() // Agrega autenticación por token si es necesario
    .build();

  // Creación del documento de Swagger basado en la configuración anterior
  const document = SwaggerModule.createDocument(app, config);

  // Configuración del endpoint donde estará disponible la documentación de Swagger
  SwaggerModule.setup('api', app, document);

  // Habilitación del puerto en el que correrá la aplicación
  await app.listen(3000);
}

bootstrap();
