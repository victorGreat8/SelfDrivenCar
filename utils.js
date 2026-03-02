function lerp(A,B,t){ // lerp is a function that takes in three parameters: A, B, and t. A and B are the two values that we want to interpolate between, and t is the amount that we want to interpolate. The function returns a value that is t percent of the way between A and B.
    return A+(B-A)*t; // A+(B-A)*t is the formula for linear interpolation. It takes the difference between B and A, multiplies it by t, and then adds it to A. This gives us a value that is t percent of the way between A and B.
}

function getIntersection(A,B,C,D){ // getIntersection is a function that takes in four parameters: A, B, C, and D. A and B are the two points that define the first line segment, and C and D are the two points that define the second line segment. The function returns the point of intersection between the two line segments, or null if there is no intersection.
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);

    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x: A.x+t*(B.x-A.x),
                y: A.y+t*(B.y-A.y),
                offset:t
            }
        }
    }

    return null;
}