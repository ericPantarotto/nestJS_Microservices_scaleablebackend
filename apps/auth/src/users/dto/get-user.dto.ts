import { Type } from 'class-transformer/types/decorators/type.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
