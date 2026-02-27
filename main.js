const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");

const Car = new car(100, 100, 30, 50);
Car.draw(ctx);

animate();

function animate(){
    canvas.height = canvas.height; // this clears the canvas
    canvas.height = window.innerHeight;

    Car.update();
    Car.draw(ctx);
    requestAnimationFrame(animate);
}
