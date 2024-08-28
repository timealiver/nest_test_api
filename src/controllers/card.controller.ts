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
import { CardService } from 'src/services/card.service';
import { CardDto } from 'src/entities/DTOs/card.dto';
  
  @Controller()
  export class CardController {
    constructor(private readonly cardService: CardService) {}
    @Post('/createCard')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(UnitOwnerGuard)
    async createCard(
      @Body() createCardDto: CardDto,
    ): Promise<{ message: string }> {
      return this.cardService.createCard(createCardDto);
      //Проверить доступ к созданию доски?? (Проверить header Authorization) (Auth Middleware)
    }
  
    @Get('/readCard')
    @HttpCode(HttpStatus.OK)
    @UseGuards(UnitOwnerGuard)
    async readCard(@Body() readCardDto: CardDto) {
      return this.cardService.readCard(readCardDto);
    }
  
    @Patch('/updateCard')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    @UseGuards(UnitOwnerGuard)
    async updateCard(
      @Body() updateCardDto: CardDto,
    ): Promise<{ message: string }> {
      return this.cardService.updateCard(updateCardDto);
    }
  
    @Delete('/deleteCard')
    @HttpCode(HttpStatus.OK)
    @UseGuards(UnitOwnerGuard)
    async deleteCard(
      @Body() deleteCardDto: CardDto,
    ): Promise<{ message: string }> {
      return this.cardService.deleteCard(deleteCardDto);
    }
  }
  