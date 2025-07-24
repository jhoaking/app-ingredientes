import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecetaIngrediente } from './ingredientes-recetas.entity';
import { RecetaImages } from './receta-images.entity';

@Entity({ name: 'recipes' })
export class Receta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;

  @Column('text', {
    nullable: true,
  })
  descripcion?: string;

  @Column('text')
  categorias: string;

  @Column('text')
  preparacion: string;

  @Column('text')
  pais: string;

  @Column('float', {
    default: 0.0,
  })
  rate: number;

  @OneToMany(
    () => RecetaIngrediente,
    (recetaIngrediente) => recetaIngrediente.receta,
    { cascade: true, eager: true },
  )
  ingredientes: RecetaIngrediente[];

  @OneToMany(() => RecetaImages, (recetaImages) => recetaImages.receta, {
    cascade: true,
    eager: true,
  })
  images?: RecetaImages[];
}
