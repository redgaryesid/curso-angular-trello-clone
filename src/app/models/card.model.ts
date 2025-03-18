import { List } from "./list.model";

export interface Card {
    id: string;
    title: string;
    position: number;
    list:List;
    description: string;
}

export interface UpdateCardDto{
    title?: string;
    description?: string;
    position?: number;
    listId?:string|number;
    boardId?:string;
}