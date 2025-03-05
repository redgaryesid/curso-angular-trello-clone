import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { BoardsService } from '@services/boards.service';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';

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

  constructor(
    private readonly dialog: Dialog,
    private readonly route: ActivatedRoute,
    private readonly boardsService: BoardsService
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
  }

  addColumn() {
    //this.columns.push({
      //title: 'New Column',
      //todos: [],
    //});
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
}
