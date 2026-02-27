const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d"); // getContext is a method that returns a drawing context on the canvas, which we can use to draw on the canvas
const road = new Road(canvas.width/2,canvas.width*0.9);

const Car = new car(road.getLaneCenter(1), 100, 30, 50);

animate();

function animate(){
    //canvas.height = canvas.height; // this clears the canvas
    Car.update();

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0,-Car.y+canvas.height*0.7); // translate is used to move the canvas, in this case we are moving it up by the car's y position minus 70% of the canvas height
    road.draw(ctx);
    Car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}
