import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categorias } from './Categorias.entity';

@Index('idx_nombre', ['nombre'], {})
@Index('idx_categoria', ['categoria'], {})
@Entity('herramientas', { schema: 'herramientas_db' })
export class Herramientas {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nombre', length: 255 })
  nombre: string;

  @Column('int', { name: 'categoria', nullable: true })
  categoria: number | null;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @ManyToOne(() => Categorias, (categorias) => categorias.herramientas, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'categoria', referencedColumnName: 'id' }])
  categoria2: Categorias;
}
