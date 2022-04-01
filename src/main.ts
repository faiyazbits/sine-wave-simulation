import './style.css'
import { Scene, Circle } from "pencil.js";

const scene = new Scene();
const radius = 30;
const circle = new Circle(scene.center, radius )

scene.add(circle);

circle.draggable();
scene.startLoop();
