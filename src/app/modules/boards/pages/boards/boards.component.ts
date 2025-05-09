import { Component } from '@angular/core';
import { faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';

import { MeService } from '@services/me.service';
import { Board } from '@models/board.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent {

  boards:Board[] = [];

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;

  constructor(
    private readonly meService: MeService
  ) { }

  ngOnInit() {
    this.getMeBoards();
  }
  
  getMeBoards() {
    this.meService.getMeBoards().subscribe((boards) => {
      console.log(boards);
      this.boards = boards;
    });
  }

}
