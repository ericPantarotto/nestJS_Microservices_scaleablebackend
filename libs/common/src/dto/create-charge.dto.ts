import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
// import { CardDto } from './card.dto';
import { CreateChargeMessage } from '../types';
import { CardDto } from './cardNew.dto';

export class CreateChargeDto implements Omit<CreateChargeMessage, 'email'> {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
