import { IsNotEmpty, IsString } from 'class-validator';
import { CardMessage } from '../types';

export class CardDto implements CardMessage {
  @IsString()
  @IsNotEmpty()
  token: string;
}
