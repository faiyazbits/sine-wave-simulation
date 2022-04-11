import { Circle, Position } from "pencil.js";


export class MainCircle extends Circle {

    public static radius:number = 150;
    constructor(position:Position){
        super(position,MainCircle.radius,{
            fill : "white",
            stroke : "red",
            strokeWidth : 4,
            zIndex: 1,
        })
    }
}