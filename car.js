class car{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxspeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.sensor=new Sensor(this);
        this.controls = new controls();
    }

    update(){
        this.#move();
        this.sensor.update();
    }

    #move(){
        if(this.controls.forward){
            this.speed+= this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-= this.acceleration;
        }

        if(this.speed > this.maxspeed){
            this.speed = this.maxspeed;
        }
        if(this.speed < -this.maxspeed/2){
            this.speed = -this.maxspeed/2;
        }

        if(this.speed>0){
            this.speed-= this.friction;
        }
        if(this.speed<0){
            this.speed+= this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed = 0;
        }

        if(this.speed != 0){
            const flip=this.speed>0?1:-1; // if speed is greater than 0, flip is 1, otherwise flip is -1
        if(this.controls.left){
            this.angle+= 0.03*flip;
        }
        if(this.controls.right){
            this.angle-= 0.03*flip;
        }
    }

        this.x -= Math.sin(this.angle)*this.speed; // sin is used to calculate the horizontal movement of the car based on its angle and speed
        this.y -= Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
        //ctx.fillStyle = "black";
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.width/2, 
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();

        this.sensor.draw(ctx);
    }
}