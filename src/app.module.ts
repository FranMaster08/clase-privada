import { Module } from '@nestjs/common';
import { HerramientasModule } from './herramientas/herramientas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HerramientasModule, CategoriasModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
