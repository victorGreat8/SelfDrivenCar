class Road{
    constructor(x,widht,laneCount=3){
        this.x=x;
        this.widht=widht;
        this.laneCount=laneCount;

        this.left=x-widht/2;
        thisright=x+widht/2;

        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;
    }

    draw(ctx){
        ctx.lineWidht=5;
        ctx.strokeStyle="white";

        ctx.beginPath();
        ctx.moveTo(this.left,this.top);
        ctx.lineTo(this.left,this.bottom);
        ctx.stroke();    
    }
}