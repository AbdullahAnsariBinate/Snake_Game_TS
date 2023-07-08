import { Cordinates } from "../types/types"

export const checkGameOver = (snakeHead: Cordinates, boundries: any) => {
    return (
        snakeHead.x < boundries.xMin ||
        snakeHead.x > boundries.xMax ||
        snakeHead.y < boundries.yMin ||
        snakeHead.y > boundries.yMax 
)
}