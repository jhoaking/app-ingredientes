import { Injectable } from '@nestjs/common';
import { RecetasService } from 'src/recetas/recetas.service';
import { initialData } from './data/recetas.data';

@Injectable()
export class SeedService {
  constructor(private readonly recetaService: RecetasService) {}

  async runSeed() {
    await this.insertNewRecipe();
    return 'SEED EXECUTED';
  }

  private async insertNewRecipe() {
    await this.recetaService.deleteAllRecipes();

    const recipes = initialData.recipes;

    const insertPromises: Promise<any>[] = [];

    recipes.forEach((recipe) => {
      insertPromises.push(this.recetaService.create(recipe));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
