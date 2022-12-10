import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Redis from 'redis';

@Injectable()
export class RedisService {
  constructor(private readonly _configService: ConfigService) {}

  createRedisClient() {
    const host = this._configService.get('redis.host');
    const port = this._configService.get('redis.port');
    return Redis.createClient({
      socket: {
        host,
        port
      }
    });
  } 
}