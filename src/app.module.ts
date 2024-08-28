import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { BoardService } from './services/board.service';
import { BoardController } from './controllers/board.controller';
import { CardController } from './controllers/card.controller';
import { CardService } from './services/card.service';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AuthController, BoardController,CardController, CommentController],
  providers: [AuthService, BoardService, CardService,CommentService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/createBoard', method: RequestMethod.POST },
        { path: '/readBoard', method: RequestMethod.GET },
        { path: '/updateBoard', method: RequestMethod.PATCH },
        { path: '/deleteBoard', method: RequestMethod.DELETE },
        { path: '/createCard', method: RequestMethod.POST },
        { path: '/readCard', method: RequestMethod.GET },
        { path: '/updateCard', method: RequestMethod.PATCH },
        { path: '/deleteCard', method: RequestMethod.DELETE },
        { path: '/createComment', method: RequestMethod.POST },
        { path: '/readComment', method: RequestMethod.GET },
        { path: '/updateComment', method: RequestMethod.PATCH },
        { path: '/deleteComment', method: RequestMethod.DELETE },
      );
  }
}
