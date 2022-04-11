import { Arc, Position } from "pencil.js";


export class AngleArc extends Arc {
    constructor(position:Position){
        super(position,30,30,0,0.25,{
            strokeWidth:5,
            stroke:'blue'
        })
    }
}