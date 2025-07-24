import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Receta } from './receta.entity';

@Entity({ name: 'recetas-ingredientes' })
export class RecetaIngrediente {
  @PrimaryColumn()
  id: number;

  @Column('text')
  nombre: string;

  @ManyToOne(() => Receta, (receta) => receta.ingredientes, {
    onDelete: 'CASCADE',
  })
  receta: Receta;
}
