import {IsNotEmpty} from 'class-validator';

export class BoardDto {
  readonly userId : string;

  readonly boardId : string;

  @IsNotEmpty({message: 'Name of board shouldn\'t be empty'})
  readonly name: string;

  readonly created_at: Date;

  readonly idCards: string[];
}



