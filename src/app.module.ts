import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthService } from './auth.service';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: parseInt(configService.get("DB_PORT"),10),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true
      })
    })
  ],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule {}
