var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext('2d');

// Gravity, how fast player goes down
var gravity = 0.1;


// Whether or not the up key is pressed
var keypressed = false;

// player image
var playerImage = new Image();
playerImage.src = "imgs/mario.png";


//single obstacle
var rect1={x:250,y:255,width:40,height:40,directionX:-2}
//two obstacles on top of each other
var rect2={x:450,y:255,width:40,height:40,directionX:-2}
var rect3={x:450,y:215,width:40,height:40,directionX:-2}
//two obstacles side by side
var rect4={x:650,y:255,width:40,height:40,directionX:-2}
var rect5={x:690,y:255,width:40,height:40,directionX:-2}

//set amount of obstacles to be spawned
var rect6={x:850,y:255,width:40,height:40,directionX:-2} 
var rect7={x:1050,y:255,width:40,height:40,directionX:-2}
var rect8={x:1250,y:255,width:40,height:40,directionX:-2}
var rect9={x:1250,y:215,width:40,height:40,directionX:-2}
var rect10={x:1450,y:255,width:40,height:40,directionX:-2} 
var rect11={x:1650,y:255,width:40,height:40,directionX:-2}
var rect12={x:1850,y:255,width:40,height:40,directionX:-2}
var rect13={x:2050,y:255,width:40,height:40,directionX:-2}
var rect14={x:2250,y:255,width:40,height:40,directionX:-2}
var rect15={x:2290,y:255,width:40,height:40,directionX:-2}
var rect16={x:2450,y:255,width:40,height:40,directionX:-2} 

//array of all spawned obstacles
var rects=[rect1,rect2,rect3,rect4,rect5, rect6, rect7,rect8,rect9,rect10,rect11,rect12,rect13,rect14,rect15,rect16];

//player creation
function player(x, y) {
    this.PlayerX = x;
    this.PlayerY = y;
    this.velocity = 0;
    this.image = playerImage;
	PlayerWidth = 52; 
	PlayerHeight= 28;
	
}

//draw the player to canvas
player.prototype.draw = function () {
    ctx.drawImage(this.image, this.PlayerX, this.PlayerY);
}

//update players location on canvas
player.prototype.update = function() {
    // Check to see if we are on under the ground
    if (this.PlayerY + this.velocity + 36 > 294) {
        this.velocity = 0;
        this.PlayerY = 294 - 36;
    } 
	else {
       //otherwise, do what velocity suggests
        this.velocity += gravity;
        this.PlayerY += this.velocity;
    } 
}

//create variable for player
var player1 = new player(30, 200);

// start the animation
requestAnimationFrame(animate);

function animate(time){
	
  // move each rect in the rects[] along the x axis
  for(var i=0;i<rects.length;i++){
    rects[i].x+=rects[i].directionX;
  }
  
    // Clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw the player where it is supposed to be
    player1.draw();
    // If the key is pressed, set velocity to -5
    if (keypressed) {
		
		if(player1.PlayerY==258){
        player1.velocity = -5;
        keypressed = false; 
		debugger;
		}
    }
    player1.update();
	drawRect();
	//drawEnemies();
	collisionDetection();
	//animate function
	requestAnimationFrame(animate);
}


//draw every rectangle in the array to the canvas
function drawRect(){
  for(var i=0;i<rects.length;i++){
    var r=rects[i];
	ctx.fillStyle = 'yellow';
    ctx.fillRect(r.x,r.y,r.width,r.height);
	ctx.strokeRect(r.x,r.y,r.width,r.height);
  }
}

//this function was created with the intention of creating infinite enemies but I couldn't get it working
function drawEnemies(){
var xNew=250;
var arrayA = [];
	for (var i = 0; i <2; ++i) {
		xNew=xNew+200;
	this["marker"+i] = {
  x:xNew,
  y:255,
  width:40,
  height:40,
  directionX:-2
	}
	arrayA.push(this.marker0,this.marker1,this.marker2,this.marker3);

	//at this point when I want to do soimething with arrayA e.g. draw all rects it throws an error
}
}

//function for collision detection, creates 2 rectangles one for player and one for eobstacle
function collisionDetection() {
for(var i=0;i<rects.length;i++){
	var r=rects[i];
	
var rect1={
	x:player1.PlayerX,
	y:player1.PlayerY,
	width:52,
	height:28
}

var rect2={ 
		x:r.x,
		y:r.y,
		width:r.width,
		height:r.height			
}

 if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
	   //throw game over alert when collision occurs
	   alert("GAME OVER");
       document.location.reload();
}
}
}

//has a keypressed check for up arrow and spacebar buttons
document.addEventListener('keydown', function (e) {
    if (e.keyCode == '38') {
        keypressed = true;
    }
	 if (e.keyCode == '32') {
        keypressed = true;
    }
}, false);