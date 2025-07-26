import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
@ObjectType()
export class UserDocument extends AbstractDocument {
  @Prop()
  @Field()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [String], default: [] })
  @Field(() => [String])
  roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
