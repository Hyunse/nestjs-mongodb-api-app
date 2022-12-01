import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigServcie: AppConfigService): MongooseModuleOptions => {
        return {
          uri: appConfigServcie.connectionString
        }
      },
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
})
export class AppModule {}
