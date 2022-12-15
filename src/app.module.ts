import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/app-config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    // RedisModule,
    /**
     * Config Module
     */
    ConfigModule.forRoot({
      load: [configuration],
    }),
    /**
     * Mongoose Module
     */
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (
        appConfigServcie: AppConfigService,
      ): MongooseModuleOptions => {
        return {
          uri: appConfigServcie.connectionString,
        };
      },
    }),
    /**
     * Modules
     */
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
