import { Circle,Position } from "pencil.js";

export class MovingDot extends Circle  {

    public static radius:number = 10;
    constructor(position:Position){
        super(position,MovingDot.radius,{
            fill : "black",
            zIndex: 1,
        })
    }
}