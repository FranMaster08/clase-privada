import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHerramientaDto {
  @ApiProperty({
    description: 'El nombre de la herramienta',
    example: 'Martillo',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  name: string;

  @ApiProperty({
    description: 'El peso de la herramienta en kilogramos',
    example: 1.5,
  })
  @IsNumber({}, { message: 'El peso debe ser un número.' })
  @Min(0, { message: 'El peso no puede ser negativo.' })
  @Type(() => Number) // Transforma el valor recibido a tipo número
  peso: number;

  @ApiProperty({
    description: 'La categoría de la herramienta (opcional)',
    example: 'Construcción',
    required: false,
  })
  @IsOptional() // Permite que este campo sea opcional
  @IsString({ message: 'La categoría debe ser una cadena de texto.' })
  categoria?: string;
}
