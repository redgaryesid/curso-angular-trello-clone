import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { Colors } from '@models/colors. model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  apiUrl = environment.API_URL;
  bufferSpace = 65535;

  constructor(private readonly http: HttpClient) {}

  getBoard(id:Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }

  createBoard(title:Board['title'], backgroundColor:Colors) {

    return this.http.post<Board>(`${this.apiUrl}/api/v1/boards`,{ title, backgroundColor },
      {
        context: checkToken(),
      }
    );
  }

  getPositions(cards:Card[],currentIndex:number) {
    if(cards.length === 1){
      return this.bufferSpace; //is new
    }
    if(cards.length > 1 && currentIndex === 0){
      //is the top
      const onTopPosition = cards[1].position;
      return onTopPosition /2;
    }
    const lastIndex = cards.length - 1;
    if(cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex){
      //is the middle
      const prevPosition = cards[currentIndex - 1].position;
      const nextPosition = cards[currentIndex + 1].position;
      return (prevPosition+nextPosition )/2;
    }
    if(cards.length > 1 && currentIndex === lastIndex){
      //is the bottom
      const onBottomPosition = cards[lastIndex - 1].position;
      return onBottomPosition + this.bufferSpace;
    }
    return 0;
  }
}
