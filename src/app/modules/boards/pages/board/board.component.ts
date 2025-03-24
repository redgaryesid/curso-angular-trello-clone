import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { BoardsService } from '@services/boards.service';
import { CardsService } from '@services/cards.service';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { List } from '@models/list.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent {

  board:Board | null = null;
  inputCard = new FormControl<string>('',{
    nonNullable: true,
    validators: [Validators.required]
  });

  inputList = new FormControl<string>('',{
    nonNullable: true,
    validators: [Validators.required]
  });
  showListForm = false;

  constructor(
    private readonly dialog: Dialog,
    private readonly route: ActivatedRoute,
    private readonly boardsService: BoardsService,
    private readonly cardsService: CardsService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const boardId = params.get('boardId');
      if (boardId) {
        this.getBoard(boardId);
      }
    })
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const position = this.boardsService.getPositions(event.container.data, event.currentIndex);
    console.log(position);
    const card = event.container.data[event.currentIndex];
    const listID = event.container.id;
    console.log(listID);
    this.updateCard(card,position,listID);
  }

  addList() {
    const title = this.inputList.value;
    console.log(title);
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) {
        console.log(output);
      }
    });
  }

  private getBoard(id: string) {
    console.log(id);
    this.boardsService.getBoard(id).subscribe((board) => {
      console.log(board);
      this.board = board;
    });
  }

  private updateCard(card: Card,position:number,listId:string|number) {
    this.cardsService.updated(card.id,{position,listId}).subscribe((cardUpdated) => {
      console.log(cardUpdated);
    });
  }

  openFormCard(list:List){
    if(this.board?.lists){
      this.board.lists = this.board.lists.map(iteratorList => {
        if(iteratorList.id === list.id){
          return {
            ...iteratorList,
            showCardForm: true
          }
        }
        return {
          ...iteratorList,
          showCardForm: false
        }
      });
    }
  }

  createCard(list:List){
    const title = this.inputCard.value;
    console.log(title);
    if(this.board){
      this.cardsService.create({
        title: title,
        listId: list.id,
        boardId: this.board.id,
        position: this.boardsService.getPosotionNewCard(list.cards)
      }).subscribe(card => {
        list.cards.push(card);
        this.inputCard.setValue('');
        list.showCardForm = false;

      }
      )
    }
  }

  closeCardForm (list: List){
    list.showCardForm = false;

  }
}
