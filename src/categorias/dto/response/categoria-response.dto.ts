import { ApiProperty } from '@nestjs/swagger';

export class CategoriasResponseDto {
  @ApiProperty({
    description: 'ID único de la categoría',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Construcción',
  })
  nombre: string;

  @ApiProperty({
    description: 'Fecha de creación de la categoría',
    type: 'string',
    format: 'date-time',
    example: '2023-09-01T12:34:56Z',
    nullable: true,
  })
  createdAt: Date | null;

  @ApiProperty({
    description: 'Fecha de la última actualización de la categoría',
    type: 'string',
    format: 'date-time',
    example: '2023-09-10T15:22:11Z',
    nullable: true,
  })
  updatedAt: Date | null;
}
