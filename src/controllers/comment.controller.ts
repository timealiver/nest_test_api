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
  import { UnitOwnerGuard } from 'src/guards/unit.owner.guard';
import { CommentService } from 'src/services/comment.service';
import { CommentDto } from 'src/entities/DTOs/comment.dto';
  
  @Controller()
  export class CommentController {
    constructor(private readonly commentService: CommentService) {}
    @Post('/createComment')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(UnitOwnerGuard)
    async createComment(
      @Body() createCommentDto: CommentDto,
    ): Promise<{ message: string,id:string }> {
      return this.commentService.createComment(createCommentDto);
      //Проверить доступ к созданию доски?? (Проверить header Authorization) (Auth Middleware)
    }
  
    @Get('/readComment')
    @HttpCode(HttpStatus.OK)
    @UseGuards(UnitOwnerGuard)
    async readComment(@Body() readCommentDto: CommentDto) {
      return this.commentService.readComment(readCommentDto);
    }
  
    @Patch('/updateComment')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    @UseGuards(UnitOwnerGuard)
    async updateComment(
      @Body() updateCommentDto: CommentDto,
    ): Promise<{ message: string }> {
      return this.commentService.updateComment(updateCommentDto);
    }
  
    @Delete('/deleteComment')
    @HttpCode(HttpStatus.OK)
    @UseGuards(UnitOwnerGuard)
    async deleteComment(
      @Body() deleteCommentDto: CommentDto,
    ): Promise<{ message: string }> {
      return this.commentService.deleteComment(deleteCommentDto);
    }
  }
  