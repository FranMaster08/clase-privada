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
import { HerramientasService } from './herramientas.service';
import { CreateHerramientaDto } from './dto/create-herramienta.dto';
import { UpdateHerramientaDto } from './dto/update-herramienta.dto';
import { Herramientas as Herramienta } from '../shared/entities/Herramientas.entity';

@ApiTags('herramientas') // Agrupa los endpoints bajo la etiqueta 'herramientas' en la documentación de Swagger
@Controller('herramientas')
export class HerramientasController {
  constructor(private readonly herramientasService: HerramientasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva herramienta' })
  @ApiBody({
    type: CreateHerramientaDto,
    description: 'Datos necesarios para crear una herramienta',
  })
  @ApiResponse({
    status: 201,
    description: 'Herramienta creada exitosamente',
    type: Herramienta,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createHerramientaDto: CreateHerramientaDto) {
    return this.herramientasService.create(createHerramientaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las herramientas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de herramientas obtenida correctamente',
    type: [Herramienta],
  })
  findAll() {
    return this.herramientasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una herramienta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la herramienta', type: String })
  @ApiResponse({
    status: 200,
    description: 'Herramienta encontrada',
    type: Herramienta,
  })
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada' })
  findOne(@Param('id') id: string) {
    return this.herramientasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una herramienta' })
  @ApiParam({
    name: 'id',
    description: 'ID de la herramienta a actualizar',
    type: String,
  })
  @ApiBody({
    type: UpdateHerramientaDto,
    description: 'Datos para actualizar la herramienta',
  })
  @ApiResponse({
    status: 200,
    description: 'Herramienta actualizada correctamente',
    type: Herramienta,
  })
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateHerramientaDto: UpdateHerramientaDto,
  ) {
    return this.herramientasService.update(+id, updateHerramientaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una herramienta' })
  @ApiParam({
    name: 'id',
    description: 'ID de la herramienta a eliminar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Herramienta eliminada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada' })
  remove(@Param('id') id: string) {
    return this.herramientasService.remove(+id);
  }
}
