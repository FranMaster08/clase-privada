import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@ApiTags('categorías') // Agrupa los endpoints bajo la categoría 'categorias' en la documentación de Swagger
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiBody({
    type: CreateCategoriaDto,
    description: 'Datos necesarios para crear una categoría',
  })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente',
    type: Categoria,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías obtenida correctamente',
    type: [Categoria],
  })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: String })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
    type: Categoria,
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría a actualizar',
    type: String,
  })
  @ApiBody({
    type: UpdateCategoriaDto,
    description: 'Datos para actualizar la categoría',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada correctamente',
    type: Categoria,
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría a eliminar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
