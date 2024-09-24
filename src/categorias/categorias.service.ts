import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categorias } from '../shared/entities/Categorias.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {
  private readonly logger = new Logger(CategoriasService.name); // Inicializa el logger

  constructor(
    @InjectRepository(Categorias)
    private readonly categoriaRepository: Repository<Categorias>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categorias> {
    this.logger.debug('Iniciando creación de categoría');

    if (!createCategoriaDto.name) {
      this.logger.warn('Error: el nombre de la categoría es obligatorio');
      throw new BadRequestException('El nombre de la categoría es obligatorio');
    }

    const herramientaExistente = await this.categoriaRepository.findOne({
      where: { nombre: createCategoriaDto.name },
    });

    if (herramientaExistente) {
      this.logger.warn('Error: el nombre de la categoría ya fue usado');
      throw new ConflictException(
        'Error: el nombre de la categoría ya fue usado',
      );
    }

    const newCategoria = this.categoriaRepository.create({
      nombre: createCategoriaDto.name,
    });
    const savedCategoria = await this.categoriaRepository.save(newCategoria);

    this.logger.log(`Categoría creada con éxito: ${savedCategoria.id}`);
    return savedCategoria;
  }

  async findAll(): Promise<Categorias[]> {
    this.logger.debug('Obteniendo todas las categorías');

    const categorias = await this.categoriaRepository.find();

    if (categorias.length === 0) {
      this.logger.warn('No se encontraron categorías');
    } else {
      this.logger.log('Categorías obtenidas correctamente');
    }

    return categorias;
  }

  async findOne(id: number): Promise<Categorias> {
    this.logger.debug(`Buscando la categoría con ID ${id}`);

    if (!id || id <= 0) {
      this.logger.warn(`ID inválido proporcionado: ${id}`);
      throw new BadRequestException(`ID inválido: ${id}`);
    }

    const categoria = await this.categoriaRepository.findOne({ where: { id } });

    if (!categoria) {
      this.logger.warn(`Categoría con ID ${id} no encontrada`);
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    this.logger.log(`Categoría con ID ${id} encontrada`);
    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categorias> {
    this.logger.debug(`Actualizando la categoría con ID ${id}`);

    const categoria = await this.findOne(id); // Reutiliza el método findOne para validar existencia

    if (!updateCategoriaDto.name) {
      this.logger.warn('Error: el nombre de la categoría es obligatorio');
      throw new BadRequestException('El nombre de la categoría es obligatorio');
    }

    const updatedCategoria = await this.categoriaRepository.save({
      ...categoria,
      ...updateCategoriaDto,
    });

    this.logger.log(`Categoría con ID ${id} actualizada con éxito`);
    return updatedCategoria;
  }

  async remove(id: number): Promise<void> {
    this.logger.debug(`Eliminando la categoría con ID ${id}`);

    const categoria = await this.findOne(id); // Reutiliza el método findOne para validar existencia

    await this.categoriaRepository.remove(categoria);

    this.logger.log(`Categoría con ID ${id} eliminada con éxito`);
  }
}
