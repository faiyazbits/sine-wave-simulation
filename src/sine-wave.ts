import {Path,Position} from 'pencil.js'

export class SineWave extends Path {
    constructor(startingPosition:Position,instructions:any[]){
        super(startingPosition,instructions,false,{
            stroke : "black",
            zIndex: 1,
        })
    }
}