import { StyleSheet, Text } from "react-native";
import { Cordinates } from "../types/types";

export default function Food({ x, y }: Cordinates): JSX.Element {
    return (
        <Text style={[{ top: y * 10, left: x * 10 }, style.food]}>🍒</Text>
    )
}

const style = StyleSheet.create({
    food: {
        height: 25,
        width: 25,
        borderRadius: 7,
        position: 'absolute'
    }
})