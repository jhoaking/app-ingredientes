import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,  } from 'typeorm';
import { Receta } from './receta.entity';

@Entity({ name: 'recetas_ingredientes' })
export class RecetaIngrediente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nombre: string;

  @ManyToOne(() => Receta, (receta) => receta.ingredientes, {
    onDelete: 'CASCADE',
  })
  receta: Receta;
}
  