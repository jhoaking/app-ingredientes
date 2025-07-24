import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { PaginationDto } from 'src/common/dto/pagination.dt';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetasService.create(createRecetaDto);
  }

  @Get()
  findAll(@Query() paginationDto : PaginationDto) {
    return this.recetasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetasService.findOnePlain(id);
  }

   @Get('search/:term')
  findByQuery(@Param('term') term: string) {
    return this.recetasService.findQueryPlain(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecetaDto: UpdateRecetaDto) {
    return this.recetasService.update(+id, updateRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetasService.remove(+id);
  }
}
