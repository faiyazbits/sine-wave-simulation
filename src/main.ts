import './style.css'
import * as d3 from 'd3';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const MAIN_CIRCLE_RADIUS = 150;
const ROTATING_CIRCLE_RADIUS = 5;
const ARC_RADIUS = 30;

const MAIN_CIRCLE_X = Math.floor(SCREEN_WIDTH/4);
const MAIN_CIRCLE_y = Math.floor(SCREEN_HEIGHT/2);

const SINE_WAVE_X = Math.floor(SCREEN_WIDTH/2);

const STROKE_WIDTH = 4;


let angle = 0;


const defaultArcOptions = {
  innerRadius: ARC_RADIUS,
  outerRadius: ARC_RADIUS,
  startAngle: 0,
  endAngle: Math.PI,
};

const svgContainer = d3
  .select("body")
  .append("svg")
  .style("background-color", "white")
  .attr("width", SCREEN_WIDTH)
  .attr("height", SCREEN_HEIGHT)

const mainCircle = svgContainer
    .append('circle')
    .attr('cx',MAIN_CIRCLE_X)
    .attr('cy',MAIN_CIRCLE_y)
    .attr('r',MAIN_CIRCLE_RADIUS)
    .attr('stroke-width',STROKE_WIDTH)
    .attr('stroke','red')
    .attr("fill", "white");


const staticHandToX =  parseInt(mainCircle.attr('cx')) + MAIN_CIRCLE_RADIUS   
const staticHand = svgContainer
  .append("line")
  .attr("x1", mainCircle.attr('cx'))
  .attr("y1", mainCircle.attr('cy'))
  .attr("x2", staticHandToX)
  .attr("y2", mainCircle.attr('cy'))
  .attr("stroke-width", STROKE_WIDTH)
  .attr("stroke", "green");


const movingHand = svgContainer
  .append("line")
  .attr("x1", mainCircle.attr('cx'))
  .attr("y1", mainCircle.attr('cy'))
  .attr("x2", staticHandToX)
  .attr("y2", mainCircle.attr('cy'))
  .attr("stroke-width", STROKE_WIDTH)
  .attr("stroke", "green");

const movingDot = svgContainer
  .append("circle")
  .attr("cx", staticHandToX)
  .attr("cy", mainCircle.attr('cy'))
  .attr("r", ROTATING_CIRCLE_RADIUS)
  .attr("stroke-width", 1)
  .attr("stroke", "green")
  .attr("fill", "black"); 

const arc = d3.arc()
    .innerRadius(ARC_RADIUS)
    .outerRadius(ARC_RADIUS)
    .startAngle(0)
    .endAngle(0)


const arcPath = svgContainer.append("path")
    .attr("d", arc(defaultArcOptions))  
    .attr("stroke-width", STROKE_WIDTH)
    .attr("stroke", "blue")
    .attr('transform',`translate(${mainCircle.attr('cx')},${mainCircle.attr('cy')}) rotate(90)`)  

const sine = d3.line();

const amplitude = MAIN_CIRCLE_RADIUS;
let points = [] as any;
let sineData = sine(points);


const sinePath = svgContainer
  .append("path")
  .attr("d", sineData)
  .attr("stroke-width", STROKE_WIDTH)
  .attr("stroke", "brown")
  .attr("fill", "white")
  .attr('transform',`translate(${SCREEN_WIDTH/2},${MAIN_CIRCLE_y})`);

const connectionLine = svgContainer
  .append("line")
  .attr("x1", movingDot.attr("cx"))
  .attr("y1", movingDot.attr("cy"))
  .attr("x2", movingDot.attr("cx"))
  .attr("y2", movingDot.attr("cy"))
  .attr("stroke-width", STROKE_WIDTH)
  .attr("stroke", "magenta");


d3.timer(() => {
  angle = angle + 0.8;
  let angleInRadians = (angle * Math.PI) / 180;
  const mainCircleX = parseInt(mainCircle.attr("cx"));
  const mainCircleY = parseInt(mainCircle.attr("cy"));
  let x = mainCircleX + Math.cos(angleInRadians) * MAIN_CIRCLE_RADIUS;
  let y = mainCircleY + Math.sin(angleInRadians) * MAIN_CIRCLE_RADIUS;
  movingHand.attr("x2", () => x);
  movingHand.attr("y2", () => y);

  movingDot.attr("cx", () => x);
  movingDot.attr("cy", () => y);

  arc.endAngle(angleInRadians);
  arcPath.attr('d', () => arc(defaultArcOptions))

  // sine wave
  points = [];
  for(let i = 0; i < angle; i+=0.8){
    let xSin = i;
    let ySin = Math.sin(i * Math.PI / 180) * amplitude;
    points.push([xSin,ySin])
  }

  const lastPoint = points[points.length - 1];

  connectionLine.attr("x1", movingDot.attr("cx"))
  connectionLine.attr("y1", movingDot.attr("cy"))
  connectionLine.attr('x2', lastPoint[0] + SCREEN_WIDTH/2);
  connectionLine.attr('y2', lastPoint[1] + MAIN_CIRCLE_y);

  sineData = sine(points);

  sinePath.attr('d',sineData);
  
  

  if(angleInRadians.toFixed(2) == "6.28"){
    angle = 0;
    arc.startAngle(0)
    arc.endAngle(0)
  }
});  
