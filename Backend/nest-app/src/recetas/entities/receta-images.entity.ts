import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Receta } from './receta.entity';

@Entity({ name: 'recetas-images' })
export class RecetaImages {
  @PrimaryColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Receta, (receta) => receta.images, { onDelete: 'CASCADE' })
  receta: Receta;
}
