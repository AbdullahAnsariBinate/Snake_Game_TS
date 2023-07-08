import { Fragment } from "react";
import { StyleSheet, View } from 'react-native'
import { Cordinates } from "../types/types"
import { color } from "../styles/colors";


interface SnakeProps {
    snake: Cordinates[];
}

export default function Snake({ snake }: SnakeProps): JSX.Element {
    console.log("🚀 ~ file: Snake.tsx:11 ~ Snake ~ snake:", snake)
    return (
        <Fragment>
            {snake.map((segment: Cordinates, index: number) => {
                console.log("🚀 ~ file: Snake.tsx:15 ~ {snake.map ~ segment:", segment)

                const customStyle = {
                    left: segment.x * 10,
                    top: segment.y * 10

                }
                return <View key={index} style={[style.snake, customStyle]} />
            })}
        </Fragment>
    )
}


export const style = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: color?.primary,
        position: 'absolute'
    }
})