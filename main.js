const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d"); // getContext is a method that returns a drawing context on the canvas, which we can use to draw on the canvas
const road = new Road(canvas.width/2,canvas.width*0.9);

const Car = new car(road.getLaneCenter(1), 100, 30, 50);
Car.draw(ctx);

animate();

function animate(){
    //canvas.height = canvas.height; // this clears the canvas
    Car.update();

    canvas.height = window.innerHeight;
    road.draw(ctx);
    Car.draw(ctx);
    requestAnimationFrame(animate);
}
