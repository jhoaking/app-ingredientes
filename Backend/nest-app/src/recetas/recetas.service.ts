import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity';
import { Repository } from 'typeorm';
import { RecetaIngrediente } from './entities/ingredientes-recetas.entity';
import { RecetaImages } from './entities/receta-images.entity';
import { PaginationDto } from 'src/common/dto/pagination.dt';

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

  findOne(id: number) {
    return `This action returns a #${id} receta`;
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
