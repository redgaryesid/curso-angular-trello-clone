import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Card, UpdateCardDto,CreateCardDto } from '@models/card.model';

import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) {}

  create(card:CreateCardDto) {
    return this.http.post<Card>(`${this.apiUrl}/api/v1/cards`, card, {
      context:checkToken()
    });
  }
  updated(cardId:Card['id'],changes:UpdateCardDto) {
    return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${cardId}`, changes,{
      context:checkToken()
    })
  }
}
