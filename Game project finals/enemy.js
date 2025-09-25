// add enemy function 
function Enemy(x,y,range){
    
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    
    this.update = function(){
        this.currentX += this.inc;
        if(this.currentX > this.x + this.range){
            this.inc = -1;
        }
        else if(this.currentX < this.x){
            this.inc = 1;
        }
    }
    
    this.draw = function(){
        this.update();
        
        
           fill(110);
        rect(this.currentX-7.5,this.y - 13.5,15,25);
        fill(225,7,7);
        ellipse(this.currentX,this.y - 5.5,7,7);
        //legs
        fill(110);
        rect(this.currentX-7.5,this.y +11.5,5,20);
        rect(this.currentX + 2.5,this.y +11.5,5,20);
        fill(110);
        rect(this.currentX-7.5,this.y +11.5,5,10);
        rect(this.currentX + 2.5,this.y + 11.5,5,10);
        //head
        fill(110);
        ellipse(this.currentX, this.y - 18.5, 15,15);
        fill(180);
        ellipse(this.currentX, this.y - 18.5,7.5,10);
        //arms
        fill(110);
        rect(this.currentX-12.5,this.y - 13.5,5,20);
        rect(this.currentX + 7,this.y -13.5,5,20);
        fill(110);
        rect(this.currentX-12.5,this.y - 13.5,5,10);
        rect(this.currentX + 7,this.y - 13.5,5,10);
        //eyes
        fill(255,7,7)
        ellipse(this.currentX - 2, this.y- 20.5, 3,3);
        ellipse(this.currentX + 2, this.y -20.5,3,3);

    }
    
    this.checkContact = function(gc_x,gc_y){
        var d = dist(gc_x,gc_y,this.currentX,this.y);
        if(d<35){
            return true;
        }
        return false;
    }   
}