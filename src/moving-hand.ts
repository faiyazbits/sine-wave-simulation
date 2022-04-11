import { Line, Position } from "pencil.js";


export class MovingHand extends Line {
    constructor (from:Position, to:Position) {
        super(from, [to], {
            stroke : "darkgreen",
            strokeWidth : 4,
        });
    }
}