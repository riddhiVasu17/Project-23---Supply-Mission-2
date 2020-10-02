//create class
class redBox {

    constructor(x,y,width,height) {
    
        //create body
        this.body = Bodies.rectangle(x, y, width, height, { isStatic : true });
        World.add(world, this.body);

        this.width = width;
        this.height = height;

    }

        display() {
        var pos = this.body.position;
        
        //make rectangle
        fill("red");
        rectMode(CENTER);
        rect(pos.x, pos.y, this.width, this.height);

    }

}