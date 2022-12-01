import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  private readonly _connectionString: string;

  constructor(private readonly _configService: ConfigService) {
    this._connectionString = this._getConnectionStringFromEnv();
  }

  get connectionString(): string {
    return this._connectionString;
  }

  private _getConnectionStringFromEnv(): string {
    const host = this._configService.get('database.host');
    const port = this._configService.get('database.port');
    
    if(!host || !port) {
      throw new Error('No DB connection string');
    }

    return `mongodb://${host}:${port}`;
  }
}
