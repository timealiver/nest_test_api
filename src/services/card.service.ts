import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Board } from 'src/entities/boards.entity';
import { Card } from 'src/entities/cards.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CardService {
    async createCard(createCardDto): Promise<{ message: string, id:string }> {
        try {
          const { userId, boardId, title, body } = createCardDto;
          if (!title || !boardId || !body) {
            throw new HttpException(
              `Fields 'title','body','boardId',shouldn't be empty`,
              HttpStatus.BAD_REQUEST,
            );
          }
          const card = new Card();
          card.creator_id = userId;
          card.created_at = new Date(Date.now());
          card.title = title;
          card.board_id=boardId;
          card.body = body;
          await card.save();
          const board = await Board.findOne({ where: { id: boardId } });
          board.idCards.push(card.id);
          await board.save();
          console.log(board);
          return { message: 'Card created succesfully', id:card.id };
        } catch (error) {
          if (!(error instanceof HttpException)) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }
          throw error;
        }
        //Проверить доступ к созданию доски?? (Проверить header Authorization) (Auth Middleware)
      }
      async readCard(readCardDto) {
        try {
          if (readCardDto.cardId){
            const card = await Card.findOne({
              where: { id: readCardDto.cardId },
            });
            return JSON.stringify(card);
          }
          else{
            throw Error;
          }
        } catch (error) {
          throw new HttpException("Can't find card", HttpStatus.BAD_REQUEST);
        }
      }
      async updateCard(updateCardDto): Promise<{ message: string }> {
        try {
          const { cardId, title, body } = updateCardDto;
          const board = await Card.findOne({ where: { id: cardId } });
          if (title) {
            board.title = title;
          }
          if(body){
            board.body = body;
          }
          await board.save();
          return { message: 'Data updated' };
        } catch (error) {
          if (!(error instanceof HttpException)) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }
          throw error;
        }
      }
      async deleteCard(deleteCardDto): Promise<{ message: string }> {
        try {
          const { cardId } = deleteCardDto;
          const card = await Card.findOne({ where: { id: cardId } });
          if (!card) {
            throw new HttpException(
              `Board with id ${cardId} not found`,
              HttpStatus.BAD_GATEWAY,
            );
          }
          await Card.remove(card);
          return { message: 'Card deleted' };
        } catch (error) {
          if (!(error instanceof HttpException)) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }
          throw error;
        }
      }  
  async isCardOwner(userId: string, cardId: string): Promise<boolean> {
    try {
      const card = await Card.findOne({
        where: { id: cardId, creator_id: userId },
      });
      console.log(card);
      return !!card;
    } catch {
      return false;
    }
  }
}
