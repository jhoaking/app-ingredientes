import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,  } from 'typeorm';
import { Receta } from './receta.entity';

@Entity({ name: 'recetas_images' })
export class RecetaImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(
    () => Receta, 
    (receta) => receta.images, 
    { onDelete: 'CASCADE' })
  receta: Receta;
}
