import { friend } from "./friend";

export interface user{
    id: number;
    username : string;
    friends: friend[];
}