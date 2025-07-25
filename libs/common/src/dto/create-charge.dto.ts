import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
// import { CardDto } from './card.dto';
import { Field, InputType } from '@nestjs/graphql';
import { CardDto } from './cardNew.dto';

@InputType()
export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  @Field(() => CardDto)
  card: CardDto;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  amount: number;
}
