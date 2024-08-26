import {IsNotEmpty} from 'class-validator';

export class CreateBoardDto {
  readonly userId : string;

  readonly boardId : string;

  @IsNotEmpty({message: 'Name of board shouldn\'t be empty'})
  readonly name: string;
}

