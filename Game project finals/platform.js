function Platform(x,y,length){
    this.x = x;
    this.y = y;
    this.length = length;
    this.draw = function(){
        fill(120,120,120);
        rect(this.x,this.y,this.length,20);
    }
    
    this.checkContact = function(gc_x,gc_y){
        // check for x axis
        if(gc_x+20>this.x && gc_x< this.x + 20 + this.length){
            //check for y axis - game char is on platform
            var d = this.y - gc_y;
            if(d>=0 && d<1){
                return true
            }
        }
        return false;
    }
}