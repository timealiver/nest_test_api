import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from 'src/services/board.service';
import { UnitOwnerGuard } from 'src/guards/unit.owner.guard';
import { BoardDto } from 'src/entities/DTOs/board.dto';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Post('/createBoard')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  //@UseGuards(BoardOwnerGuard)
  async createBoard(
    @Body() createBoardDto: BoardDto,
  ): Promise<{ message: string }> {
    return this.boardService.createBoard(createBoardDto);
    //Проверить доступ к созданию доски?? (Проверить header Authorization) (Auth Middleware)
  }

  @Get('/readBoard')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UnitOwnerGuard)
  async readBoard(@Body() readBoardDto: BoardDto) {
    return this.boardService.readBoard(readBoardDto);
  }

  @Patch('/updateBoard')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(UnitOwnerGuard)
  async updateBoard(
    @Body() updateBoardDto: BoardDto,
  ): Promise<{ message: string }> {
    return this.boardService.updateBoard(updateBoardDto);
  }

  @Delete('/deleteBoard')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UnitOwnerGuard)
  async deleteBoard(
    @Body() deleteBoardDto: BoardDto,
  ): Promise<{ message: string }> {
    return this.boardService.deleteBoard(deleteBoardDto);
  }
}
