import { Cordinates } from "../types/types";
export const randomFoodPosition = (maxX: number, maxY: number): Cordinates => {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
    };
};