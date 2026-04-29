const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d"); // getContext is a method that returns a drawing context on the canvas, which we can use to draw on the canvas
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);

const Car = new car(road.getLaneCenter(1), 100, 30, 50, "AI");
const traffic =[
    new car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
];

animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    Car.update(road.borders,traffic);

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;


    carCtx.save();
    carCtx.translate(0,-Car.y+carCanvas.height*0.7); // translate is used to move the canvas, in this case we are moving it up by the car's y position minus 70% of the canvas height
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx, "red");
    }
    Car.draw(carCtx, "blue");

    carCtx.restore();

    Visualizer.drawNetwork(networkCtx, Car.brain);
    requestAnimationFrame(animate);
}