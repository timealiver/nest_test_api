import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthUserDto, CreateUserDto } from '../entities/DTOs/user.dto';
import { BoardService } from 'src/services/board.service';
import { BoardOwnerGuard } from 'src/guards/board-owner.guard';
import { BoardDto } from 'src/entities/DTOs/board.dto';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Post('/createBoard')
  @HttpCode(HttpStatus.CREATED)
  //@UseGuards(BoardOwnerGuard)
  async createBoard(@Body() createBoardDto: BoardDto){
        return this.boardService.createBoard(createBoardDto);
      //Проверить доступ к созданию доски?? (Проверить header Authorization) (Auth Middleware)
  }

  @Get('/readBoard')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BoardOwnerGuard)
  async readBoard(@Body() readBoardDto: BoardDto){
        return this.boardService.readBoard(readBoardDto);

    }
}
