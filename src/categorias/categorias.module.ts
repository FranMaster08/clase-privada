import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from 'src/shared/entities/Categorias.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categorias]), // Registra la entidad Categorias para TypeORM
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
