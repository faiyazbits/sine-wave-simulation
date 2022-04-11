import './style.css'
import { Scene, Position, Path } from "pencil.js";
import { MainCircle } from './main-circle';
import { Hand } from './hand';
import { AngleArc } from './angle-arc';
import { MovingDot } from './moving-dot';
import { SineWave } from './sine-wave';

let angle = 0;
const scene = new Scene();
const mainCirclePosition = new Position(Math.floor(scene.width/4),scene.center.y);

const circle:any = new MainCircle(mainCirclePosition);


const handPosition = new Position(mainCirclePosition.x + MainCircle.radius,scene.center.y)
const hand = new Hand(mainCirclePosition,handPosition)


const movingHandPosition = new Position(mainCirclePosition.x,scene.center.y - MainCircle.radius)
const movingHand = new Hand(mainCirclePosition,movingHandPosition)


const angleArc:any = new AngleArc(mainCirclePosition)


const movingDotPosition = new Position(mainCirclePosition.x + MainCircle.radius,scene.center.y)
const movingDot:any  = new MovingDot(movingDotPosition);
const sineMovingDot:any  = new MovingDot(Scene.center);

const sine:any = new SineWave(scene.center,[
]);

scene.add(circle);
scene.add(hand);
scene.add(angleArc);
scene.add(movingHand);
scene.add(movingDot);
scene.add(sine);
scene.add(sineMovingDot);


scene.on(Scene.events.draw,() => {
    angle = angle - 0.08;
    let angleInRadians = (angle * Math.PI)/180;
    let x = circle.position.x + Math.cos(angleInRadians) * MainCircle.radius;
    let y = circle.position.y + Math.sin(angleInRadians) * MainCircle.radius;
    movingDot.position.x = x;
    movingDot.position.y = y;

    let xS = scene.center.x + Math.cos(angleInRadians) * MainCircle.radius;
    let yS = scene.center.y + Math.sin(angleInRadians) * MainCircle.radius;
    sineMovingDot.position.x = xS;
    sineMovingDot.position.y = yS;
})


scene.startLoop();