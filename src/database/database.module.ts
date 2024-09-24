import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'fran',
      password: process.env.DB_PASSWORD || 'fran',
      database: process.env.DB_NAME || 'herramientas_db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Indica las entidades
      synchronize: false, // Para desarrollo, sincroniza el esquema de base de datos
    }),
  ],
})
export class DatabaseModule {}
