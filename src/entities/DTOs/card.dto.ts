export class CardDto {
  readonly userId: string;

  readonly boardId: string;

  readonly cardId: string;

  readonly title: string;

  readonly body: string;

  readonly created_at: Date;

  readonly idCommments: string[];
}
