import './entry.less';
$(function(){

    var ctx = document.getElementById('canvas'),
    content = ctx.getContext('2d'),
    round= [],
    initRoundPopulation = 80

const WIDTH = document.documentElement.clientWidth;
const HEIGHT = document.documentElement.clientHeight;


ctx.width = WIDTH;
ctx.height = HEIGHT;

function Round_item(index, x, y){
    this.index = index;
    this.x = x;
    this.y = y;
    this.r = Math.random() * 2 + 1;
    var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = "rgba(255, 255, 255", + alpha + ")";
}

Round_item.prototype.draw = function(){
    content.beginPath();
    content.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    content.closePath();
    content.fillStyle = this.color;
    content.shadowBlur = this.r * 2;
    content.shadowColor = this.color;
    content.fill();
}

Round_item.prototype.move = function(){
    this.y += 1;
    if(this.y >= HEIGHT){
        this.y = -10
    }
    this.draw()
}



const animate = () => {
    content.clearRect(0, 0, WIDTH, HEIGHT);
    
    for(var i in round){
        round[i].move()
    }
    requestAnimationFrame(animate)
}

const init = () => {
    for(var i = 0; i < initRoundPopulation; i++){
        round[i] = new Round_item(i, Math.random() * WIDTH, Math.random() * HEIGHT);
        round[i].draw();
    }
    animate()
}

init()


})