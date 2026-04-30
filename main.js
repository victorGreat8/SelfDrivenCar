const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d"); // getContext is a method that returns a drawing context on the canvas, which we can use to draw on the canvas
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);

const N = 100;
const Cars = generateCars(N);
let bestCar = Cars[0]; // bestCar is the car that has the lowest y value, which means it is the furthest ahead

if(localStorage.getItem("bestBrain")){
    bestCar.brain=JSON.parse(
        localStorage.getItem("bestBrain"));
}

const traffic =[
    new car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
];

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars = [];
    for(let i=1;i<=N;i++){
        cars.push(new car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    
    for(let i=0;i<Cars.length;i++){
        Cars[i].update(road.borders,traffic);
    }
    bestCar=Cars.find(
        c=>c.y==Math.min(...Cars.map(c=>c.y))
    );

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7); // translate is used to move the canvas, in this case we are moving it up by the car's y position minus 70% of the canvas height
    
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx, "red");
    }

    carCtx.globalAlpha=0.2; // globalAlpha is used to set the opacity of the canvas, in this case we are setting it to 0.2 so that the cars are transparent
    
    for(let i=0;i<Cars.length;i++){
        Cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha=1; // set the opacity back to 1 for the best car
    bestCar.draw(carCtx, "blue", true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}