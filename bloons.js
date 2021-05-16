//Checkers 

var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');
	
var mouse = {
	x: undefined,
	y: undefined
}
	
window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})
	
var monkey = [//If you add more/less colors you must change the variable being given to a circle
	'blue',
	'green',
	'yellow',
	'purple',
	'red',
	'orange',
	'cyan',
	'pink',
	'teal',
	'beige'
	];
	
function Circle(x, y, dx, dy, radius, colorArray) {
	this.x = x;
	this.y =  innerHeight - radius;//Determines where the ball spawns on the y axis
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.colorArray = monkey[colorArray];//Pulls a random color out of the monkey array
	
	this.draw = function() {
		c.beginPath();
		c.strokeStyle = "blue";
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.stroke();
		c.fillStyle = this.colorArray;
		c.fill();
		this.update();
	}
	
	this.update = function() {
		//If outside of border, recenter
		if(this.y + this.radius > innerHeight)
		{
			this.y = innerHeight - this.radius;
			if(this.dy > 0)
			{
				this.dy = -this.dy;
			}
		}
		
		if(this.y + this.radius < 0)
		{
			this.y = 0 + this.radius;
			if(this.dy < 0)
			{
				this.dy = -this.dy;
			}
		}
		
		
		//Determine which direction to bounce
		if(this.y + this.radius > innerHeight && this.dy > 0)//Bottom
		{
			this.dy = -this.dy;
		}
		else if(this.y - this.radius < 0 && this.dy < 0)//Top
		{
			this.dy = -this.dy;
		}
		
		if(this.x + this.radius > innerWidth && this.dx > 0)//Right
		{
			this.dx = -this.dx;
		}
		else if(this.x - this.radius < 0 && this.dx < 0)//Left
		{
			this.dx = -this.dx;
		}
		
		
		//if touched, bounce
		if(this.x - mouse.x < this.radius && this.x - mouse.x > -this.radius && this.y - mouse.y < this.radius && this.y - mouse.y > -this.radius)
		{
			//Y coord
			this.y += -0.00001;
			if(this.dy < 0) 
			{
				this.dy--;//Change this to change the rate of the ball going up when touched
			}
			else
			{
				this.dy++; //Change this to change the rate of the ball going up when touched
				this.dy = -this.dy;
			}
			//X coord
			if(this.radius / 2 > this.x - mouse.x)//When right half of ball touched
			{
				this.dx -= 3; //Change this to change the rate of the ball going left when touched
			}
			else if(this.radius / 2 < this.x - mouse.x)//When left half of ball touched
			{
				this.dx += 3; //Change this to change the rate of the ball going right when touched
			}
		}
		else
		{
			//if not touched, return to normal
			if(this.dy < 0)
			{
				this.dy += .3;//Change this to increase the rate at which the ball loses velocity when going up
			}
			else if(this.dy > 0)
			{
				this.dy += .15;//Change this to increase the rate at which the ball gains velocity when falling
			}
			
			if(this.dx < 0)
			{
				this.dx += .1;//Change the rate at which the ball loses velocity when moving left
			}
			else if(this.dx > 0)
			{
				this.dx -= .1;//Change the rate at which the ball loses velocity when moving right
			}
		}
		//change positions 
		if(this.dy != 0)
		{
			this.y += this.dy;// adds velocity to y axis
		}
		this.x += this.dx;// adds velocity to x axis
	}
		
}

	var circleQty = Math.random() * 20;//Change the number for more balls. Remove random for a guranteed amount
	var circles = [];
	for(var i = 0; i < circleQty; i++)
	{
		circles.push(new Circle(Math.random() * innerWidth,//Dont touch
		innerHeight, //Dont touch this
		0,
		0,
		Math.random() * 150,//Determines the size of a circle
		parseInt(Math.random() * 10)));//Dont touch this
	}

function animate() {
	c.clearRect(0, 0, innerWidth, innerHeight);
	for(var i = 0; circleQty > i; i++)
	{
		circles[i].draw();
	}
	requestAnimationFrame(animate);
}

animate();
	