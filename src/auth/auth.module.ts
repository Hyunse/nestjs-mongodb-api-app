import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthSerializer } from './auth-serializer.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, AuthSerializer],
})
export class AuthModule {}
