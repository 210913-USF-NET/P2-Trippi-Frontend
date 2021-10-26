import { ratings } from "./ratings";


export interface tripPost{
    id: number;
    username: string;
    startAddress: string;
    endAddress: string;
    startLat: number;
    startLong: number;
    endLat: number;
    endLong: number;
    rating: ratings[] | null;
}
