export interface GestureEventTypes {
    nativeEvent: { translationX: number, translationY: number }
}

export interface Cordinates {
    x: number;
    y: number
}

//enum data type use for defined constant num & str
export enum Direction {
    Right,
    Up,
    Left,
    Down
}