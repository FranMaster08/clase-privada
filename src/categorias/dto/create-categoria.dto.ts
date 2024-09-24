import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'El nombre de la categoria',
    example: 'Carpinteria',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name: string;
}
