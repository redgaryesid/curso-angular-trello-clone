import { List } from "./list.model";

export interface Card {
    id: string;
    title: string;
    position: number;
    list:List;
    description: string;
}