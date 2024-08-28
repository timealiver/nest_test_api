import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Card } from 'src/entities/cards.entity';
import { Comment } from 'src/entities/comments.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CommentService {
  async createComment(createCommentDto): Promise<{ message: string, id:string }> {
    try {
      const { userId, cardId, body } = createCommentDto;
      if ( !cardId || !body) {
        throw new HttpException(
          `Fields 'title','cardId',shouldn't be empty`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const comment = new Comment();
      comment.creator_id = userId;
      comment.created_at = new Date(Date.now());
      comment.card_id=cardId;
      comment.body = body;
      await comment.save();
      const card = await Card.findOne({ where: { id: cardId } });
      card.idComments.push(comment.id);
      await card.save();
      console.log(card);
      return { message: 'Comment created succesfully', id:comment.id };
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }
  async readComment(readCommentDto) {
    try {
      if (readCommentDto.commentId){
        const comment = await Comment.findOne({
          where: { id: readCommentDto.commentId },
        });
        return JSON.stringify(comment);
      }
      else{
        throw Error;
      }
    } catch (error) {
      throw new HttpException("Can't find comment", HttpStatus.BAD_REQUEST);
    }
  }
  async updateComment(updateCommentDto): Promise<{ message: string }> {
    try {
      const { commentId, title, body } = updateCommentDto;
      const card = await Comment.findOne({ where: { id: commentId } });
      if(body){
        card.body = body;
      }
      await card.save();
      return { message: 'Data updated' };
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }
  async deleteComment(deleteCommentDto): Promise<{ message: string }> {
    try {
      const { commentId } = deleteCommentDto;
      const comment = await Comment.findOne({ where: { id: commentId } });
      if (!comment) {
        throw new HttpException(
          `Card with id ${commentId} not found`,
          HttpStatus.BAD_GATEWAY,
        );
      }
      await Comment.remove(comment);
      return { message: 'Comment deleted' };
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }  
  async isCommentOwner(userId: string, commentId: string): Promise<boolean> {
    try {
      const comment = await Comment.findOne({
        where: { id: commentId, creator_id: userId },
      });
      console.log(comment);
      return !!comment;
    } catch {
      return false;
    }
  }
}
