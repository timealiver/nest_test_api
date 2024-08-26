import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { BoardService } from "src/services/board.service";

@Injectable()
export class BoardOwnerGuard implements CanActivate {
    constructor(private boardService: BoardService){};
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.body.userId;
    const boardId = request.body.boardId;
    console.log(userId, boardId);
    if (userId && boardId){
        return this.boardService.isBoardOwner(userId,boardId)
    }else{
        throw new HttpException('You are not the owner of this board', HttpStatus.FORBIDDEN);
    }

            
    } catch (error) {
        if (!(error instanceof HttpException)){
            throw new HttpException("Bad Request",HttpStatus.BAD_REQUEST)
          }
          throw error;
    }
}
}