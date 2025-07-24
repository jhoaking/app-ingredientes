import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRecetaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @MinLength(2)
  categorias: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rate?: number;

  @IsString()
  @MinLength(1)
  preparacion: string;

  @IsString()
  pais?: string;

  @IsString({ each: true })
  @IsArray()
  ingredientes: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
