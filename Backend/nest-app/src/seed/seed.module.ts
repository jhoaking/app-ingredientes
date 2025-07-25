import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RecetasModule } from 'src/recetas/recetas.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [RecetasModule]
})
export class SeedModule {}
