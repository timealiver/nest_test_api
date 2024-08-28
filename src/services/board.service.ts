import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Board } from 'src/entities/boards.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class BoardService {
  async createBoard(createBoardDto): Promise<{ message: string }> {
    try {
      const { userId, name } = createBoardDto;
      if (!name) {
        throw new HttpException(
          "Name shouldn't be empty",
          HttpStatus.BAD_REQUEST,
        );
      }
      const board = new Board();
      board.creator_id = userId;
      board.created_at = new Date(Date.now());
      board.name = name;
      console.log(board);
      await board.save();
      const user = await User.findOne({ where: { id: userId } });
      user.idBoards.push(board.id);
      await user.save();
      console.log(user);
      return { message: 'Task created succesfully' };
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
    //Проверить доступ к созданию доски?? (Проверить header Authorization) (Auth Middleware)
  }
  async readBoard(readBoardDto) {
    try {
      const board = await Board.findOne({
        where: { id: readBoardDto.boardId },
      });
      return JSON.stringify(board);
    } catch (error) {
      throw new HttpException("Can't find board", HttpStatus.BAD_REQUEST);
    }
  }
  async updateBoard(updateBoardDto): Promise<{ message: string }> {
    try {
      const { boardId, name } = updateBoardDto;
      const board = await Board.findOne({ where: { id: boardId } });
      if (name) {
        board.name = name;
        await board.save();
        return { message: 'Board name updated' };
      } else {
        throw new HttpException('Name is null', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }
  async deleteBoard(deleteBoardDto): Promise<{ message: string }> {
    try {
      const { boardId } = deleteBoardDto;
      const board = await Board.findOne({ where: { id: boardId } });
      if (!board) {
        throw new HttpException(
          `Board with id ${boardId} not found`,
          HttpStatus.BAD_GATEWAY,
        );
      }
      await Board.remove(board);
      return { message: 'Board deleted' };
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }
  async isBoardOwner(userId: string, boardId: string): Promise<boolean> {
    try {
      const board = await Board.findOne({
        where: { id: boardId, creator_id: userId },
      });
      console.log(board);
      return !!board;
    } catch {
      return false;
    }
  }
}
