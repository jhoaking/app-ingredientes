import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity';
import { RecetaIngrediente } from './entities/ingredientes-recetas.entity';
import { RecetaImages } from './entities/receta-images.entity';

@Module({
  controllers: [RecetasController],
  providers: [RecetasService],
  imports : [TypeOrmModule.forFeature([Receta,RecetaIngrediente,RecetaImages])]
})
export class RecetasModule {}
