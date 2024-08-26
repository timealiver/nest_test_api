import { HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { Board } from "src/entities/boards.entity";
import { User } from "src/entities/user.entity";


@Injectable()
export class BoardService{
    async createBoard(createBoardDto){
        try {
           const {userId, name} = createBoardDto;
           if (!name){
            throw new HttpException("Name shouldn\'t be empty",HttpStatus.BAD_REQUEST)
           }
           const board = new Board();
           board.creator_id=userId;
           board.created_at=new Date(Date.now());
           board.name = name;
           console.log(board);
           await board.save();
           const user = await User.findOne({where: {id: userId}})
           user.idBoards.push(board.id);
           await user.save();
           console.log(user);

        } catch (error) {
            if (!(error instanceof HttpException)){
                throw new HttpException(error,HttpStatus.BAD_REQUEST)
              } 
            throw error;
        };
        //Проверить доступ к созданию доски?? (Проверить header Authorization) (Auth Middleware)
    }
    async readBoard(readBoardDto){
        const board = await Board.findOne({where:{id:readBoardDto.boardId}});
        return JSON.stringify(board);
    }
    async updateBoard(){

    }
    async deleteBoard(){

    }
    async isBoardOwner(userId: string, boardId: string): Promise<boolean> {
        try {
            const board = await Board.findOne({ where: { id: boardId, creator_id: userId } });
            console.log(board);
            return !!board;       
        } catch {
            return false;
        }
      }
    
}