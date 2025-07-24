import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity';
import { Repository } from 'typeorm';
import { RecetaIngrediente } from './entities/ingredientes-recetas.entity';
import { RecetaImages } from './entities/receta-images.entity';
import { PaginationDto } from 'src/common/dto/pagination.dt';

import { validate as isUUID } from 'uuid';

@Injectable()
export class RecetasService {
  private readonly logger = new Logger('RecetasService');

  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,
    @InjectRepository(RecetaIngrediente)
    private readonly recetaIngredienteRepository: Repository<RecetaIngrediente>,
    @InjectRepository(RecetaImages)
    private readonly recetaImageRepository: Repository<RecetaImages>,
  ) {}

  async create(createRecetaDto: CreateRecetaDto) {
    try {
      const { images = [], ingredientes = [], ...rest } = createRecetaDto;

      const receta = this.recetaRepository.create({
        ...rest,
        images: images.map((image) =>
          this.recetaImageRepository.create({ url: image }),
        ),
        ingredientes: ingredientes.map((ingrediente) =>
          this.recetaIngredienteRepository.create({ nombre: ingrediente }),
        ),
      });
      await this.recetaRepository.save(receta);
      return { ...rest, images, ingredientes };
    } catch (error) {
      this.handlerException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const receta = await this.recetaRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
        ingredientes: true,
      },
    });
    return receta.map((receta) => ({
      ...receta,
      images: receta.images?.map((img) => img.url),
      ingredientes: receta.ingredientes.map((ingre) => ingre.nombre),
    }));
  }

  async findOne(id: string) {
    let receta: Receta | null = null;

    if (isUUID(id)) {
      receta = await this.recetaRepository.findOneBy({ id: id });
    }

    if (!receta) {
      throw new NotFoundException(`receta with ${id} not found`);
    }
    return receta;
  }

  async findQuery(term: string) {
    const recetas = await this.recetaRepository
      .createQueryBuilder('rece')
      .where('LOWER(rece.categorias) = :term OR LOWER(rece.nombre) = :term', {
        term: term.toLowerCase(),
      })
      .leftJoinAndSelect('rece.images', 'receImage')
      .leftJoinAndSelect('rece.ingredientes', 'receIngrediente')
      .getMany();

    if (!recetas.length) {
      throw new NotFoundException(`No se encontraron recetas con "${term}"`);
    }

    return recetas;
  }

  async findOnePlain(id: string) {
    const { images = [], ingredientes = [], ...rest } = await this.findOne(id);
    return {
      ...rest,
      images: images.map((ima) => ima.url),
      ingredientes: ingredientes.map((ingre) => ingre.nombre),
    };
  }

  async findQueryPlain(term: string) {
    const recetas = await this.findQuery(term);
    return recetas.map(({ images = [], ingredientes = [], ...rest }) => ({
      ...rest,
      images: images.map((ima) => ima.url),
      ingredientes: ingredientes.map((ingre) => ingre.nombre),
    }));
  }


  update(id: number, updateRecetaDto: UpdateRecetaDto) {
    return `This action updates a #${id} receta`;
  }



  
  remove(id: number) {
    return `This action removes a #${id} receta`;
  }

  private handlerException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'unexpected error check server logs!',
    );
  }
}
