class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 10; // Number of rays(yellow lines) that will be cast from the car
        this.rayLength=150; // Length of the rays, how far the yellow lines will reach
        this.raySpread = Math.PI/2; // Do so that the rays are spread out in a 45 degree angle

        this.rays=[];
        this.readings=[];
    }

    update(roadBorders){
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(
                this.#getReading(this.rays[i],roadBorders)
            );
        }
    }

    #getReading(ray,roadBorders){ // ray is the yellow line that we are casting, roadBorders is the array of the borders of the road
        let touches=[];

        for(let i=0;i<roadBorders.length;i++){ // for each border of the road, we will check if the ray intersects with it
            const touch=getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }

        if(touches.length==0){ 
            return null;
        }else{
            const offsets=touches.map(e=>e.offset);
            const minOffset=Math.min(...offsets);
            return touches.find(e=>e.offset==minOffset);
        }
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
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i]; // if there is a reading, we will draw the ray to the point of intersection instead of the end point
            }
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(this.rays[i][0].x,
                this.rays[i][0].y);
            ctx.lineTo(end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(this.rays[i][1].x,
                this.rays[i][1].y);
            ctx.lineTo(end.x,
                end.y
            );
            ctx.stroke();
        }  
    }
}