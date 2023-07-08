import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { color } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Cordinates, Direction, GestureEventTypes } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";

//Constant Variable
// use array of object because when snake eat an apple so add more snake
const Snake_Initial_Position = [{ x: 5, y: 5 }];
const Food_Initial_Position = { x: 5, y: 20 };
const Game_Boundary = { xMin: 0, xMax: 34.5, yMin: 1, yMax: 74 };
//Snake move auto 50 mili sec
const Move_Interval = 50;
const Score = 10

export default function Game(): JSX.Element {

    const [direction, setDirection] = React.useState<Direction>(Direction.Right)
    const [snake, setSnake] = React.useState<Cordinates[]>(Snake_Initial_Position)
    const [food, setFood] = React.useState<Cordinates>(Food_Initial_Position)
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false)
    const [isPause, setIsPause] = React.useState<boolean>(false)
    const [score, setScore] = React.useState<number>(0)


    React.useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPause && moveSnake();
            }, Move_Interval)

            return () => clearInterval(intervalId)
        }
    }, [snake, isGameOver, isPause])

    //Function
    const handleGesture = (event: GestureEventTypes) => {
        //destructure
        const { translationX, translationY } = event.nativeEvent

        // condition
        if (Math.abs(translationX) > Math.abs(translationY)) {

            if (translationX > 0) {
                setDirection(Direction.Right)
            } else {
                setDirection(Direction.Left)
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.Down)

            } else {
                setDirection(Direction.Up)

            }
        }
    }

    //Move Snake Function
    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead }  //Creating copy

        //Game over
        if (checkGameOver(snakeHead, Game_Boundary)) {
            setIsGameOver((prev) => !prev)
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
            default:
                break;
        }

        //if food grow snake
        if (checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodPosition(Game_Boundary.xMax, Game_Boundary.yMax))
            setSnake([newHead, ...snake])
            //Update score
            setScore(score + Score)

        }else{
        setSnake([newHead, ...snake.slice(0, -1)])

        }

        // setSnake([newHead, ...snake.slice(0, -1)])
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={style.container}>
                <View style={style.boundries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary
    },
    boundries: {
        flex: 1,
        borderColor: color.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: color.background,
    }
})