import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


import { BoardsService } from '@services/boards.service';
import { Colors } from '@models/colors. model';
@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {
  
  form = this.formBuilder.nonNullable.group({
    title: ['',[Validators.required]],
    //Al hacerlo de esta manera, evitamos que se pueda ingresar cualquier valor, 
    //Ahora solo va a recibir valores de tipo Colors.
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly boardsService: BoardsService,
    private readonly router: Router
  ){

  }

  doSave(){
    if(this.form.valid){
      const {title, backgroundColor} = this.form.getRawValue(); 
      console.log(title, backgroundColor);
      this.boardsService.createBoard(title, backgroundColor)
      .subscribe((board) => {
        console.log(board);
        this.router.navigate(['/app/boards', board.id]);
      });
    }else{
      this.form.markAllAsTouched();
    }
  }
}
