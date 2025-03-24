import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';


import { checkToken } from '@interceptors/token.interceptor';
import { List,CreateListDto } from '@models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) {}

  create(list:CreateListDto) {
    return this.http.post<List>(`${this.apiUrl}/api/v1/lists`, list, {
      context:checkToken()
    });
  }
}
