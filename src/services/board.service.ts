import { HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { Board } from "src/entities/boards.entity";


@Injectable()
export class BoardService{
    async createBoard(createBoardDto){
        try {
           const {userId, name} = createBoardDto;
           if (!name){
            return new HttpException("Name shouldn\'t be empty",HttpStatus.BAD_REQUEST)
           }
           const board = new Board();
           board.creator_id=userId;
           board.created_at=new Date(Date.now());
           board.name = name;

        } catch {};
        //Проверить доступ к созданию доски?? (Проверить header Authorization) (Auth Middleware)
    }
    async readBoard(){

    }
    async updateBoard(){

    }
    async deleteBoard(){

    }
}