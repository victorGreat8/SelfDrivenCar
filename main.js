const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d"); // getContext is a method that returns a drawing context on the canvas, which we can use to draw on the canvas
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);

const N = 100;
const Cars = generateCars(N);

const traffic =[
    new car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
];

animate();

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

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-Cars[0].y+carCanvas.height*0.7); // translate is used to move the canvas, in this case we are moving it up by the car's y position minus 70% of the canvas height
    
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx, "red");
    }

    carCtx.globalAlpha=0.2; // globalAlpha is used to set the opacity of the canvas, in this case we are setting it to 0.2 so that the cars are transparent
    
    for(let i=0;i<Cars.length;i++){
        Cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha=1; // set the opacity back to 1 for the best car
    Cars[0].draw(carCtx, "blue", true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx, Cars[0].brain);
    requestAnimationFrame(animate);
}