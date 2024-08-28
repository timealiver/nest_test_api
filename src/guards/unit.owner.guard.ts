import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { BoardService } from 'src/services/board.service';
import { CardService } from 'src/services/card.service';
import { CommentService } from 'src/services/comment.service';

@Injectable()
export class UnitOwnerGuard implements CanActivate {
  constructor(
    private boardService: BoardService,
    private cardService: CardService,
    private commentService: CommentService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const { userId, boardId, cardId, commentId } = request.body;
      console.log(userId, boardId);

      if (userId && boardId) { //CRUD для Board
        console.log("3",userId,boardId);
        return this.boardService.isBoardOwner(userId, boardId);
      } else if(userId && cardId){ //CRUD для Card
        console.log("2",userId,cardId);
        return this.cardService.isCardOwner(userId, cardId)
      } else if(userId && commentId){  //CRUD для Comment
        console.log("1",userId,commentId);
        return this.commentService.isCommentOwner(userId, commentId)
      }
      console.log("4",userId,commentId,boardId,cardId);
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }
}
