class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 10; // Number of rays(yellow lines) that will be cast from the car
        this.rayLength=150; // Length of the rays, how far the yellow lines will reach
        this.raySpread = Math.PI/2; // Do so that the rays are spread out in a 45 degree angle

        this.rays=[];
    }

    update(){
        this.#castRays();
    }

    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                //i/(this.rayCount-1)
                this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;

            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x-
                Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
        }
    }


    draw(ctx){
        for(let i=0;i<this.rayCount;i++){
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(this.rays[i][0].x,
                this.rays[i][0].y);
            ctx.lineTo(this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.stroke();
        }  
    }
}