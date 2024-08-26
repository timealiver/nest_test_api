import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { join } from 'path';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { BoardService } from './services/board.service';
import { BoardController } from './controllers/board.controller';
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
  controllers: [AuthController,BoardController],
  providers: [AuthService,BoardService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'login', method: RequestMethod.POST })
      .exclude({ path: 'reg', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
