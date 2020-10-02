//game states
var SERVE = 0;
var YAY = 1;
var gameState = SERVE;

//ground
var ground, groundSprite;

//background
var bg;

//helicopter and package
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody, option;

//red box objects
var box1, box2, box3;

//constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	//load Images here
	helicopterIMG = loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
	bg = loadImage("bg.png");
}

function setup() {
	//create canvas
	createCanvas(1536, 718.5);
	rectMode(CENTER);
	
    //create sprites 
	packageSprite = createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.25;

	helicopterSprite = createSprite(0, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale = 0.8;

	groundSprite = createSprite(width/2, height-100, width,10);
	groundSprite.shapeColor = color(255)
    groundSprite.visible = false;

	//create engine
	engine = Engine.create();
	world = engine.world;

	//add option and restituion under it
	option = {
		restitution : 3
	}

	//create physical body for package
	packageBody = Bodies.circle(width/2 , 200 , 5 , {isStatic : true});
	World.add(world, packageBody);
	

	//create physical body for ground
	ground = Bodies.rectangle(width/2, height-100, width, 10 , {isStatic : true} );
 	World.add(world, ground);

	//create objects for red box
	 box1 = new redBox(width/2, 650, 200, 20);
	 
	 box2 = new redBox(658, 610, 20, 100);
	 
	 box3 = new redBox(878, 610, 20, 100);

	//update engine
	Engine.run(engine);
  
}


function draw() {

  //set mode to rectangle
  rectMode(CENTER);

  //add image to background
  background(bg);

  //make the positions of package sprite and body same
  packageSprite.x = packageBody.position.x; 
  packageSprite.y = packageBody.position.y;  

  //make the x position of package sprite and helicopter sprite same
  packageSprite.x = helicopterSprite.x;

  //make the positions of ground sprite and body same
  groundSprite.x = ground.position.x; 
  groundSprite.y = ground.position.y; 

  //display the objects of red box
  box1.display();
  box2.display();
  box3.display();

  //call function 'heli'
  heli()

  //display a message when started
  if (gameState === SERVE) {
	fill("black");
	textFont("Times New Roman");
	textStyle(BOLD);
	textSize(40);
	text("Press down key after the helicopter stops", 390, 50);
  }
  
  //display created sprites
  drawSprites();


}
   
function heli() {
	//set velocity to helicopter
	helicopterSprite.velocityX = 10;	

	//stop it when it is in the middle
	if (helicopterSprite.x > width/2){
	  helicopterSprite.velocityX = 0;
	  
	  //drop package when down arrow is pressed
	  if (keyDown(DOWN_ARROW)) {
		Matter.Body.setStatic(packageBody, false);
		packageBody.restitution = 1;

	   }

	   }

	//display message when completed and change game state
	if (packageSprite.y > 450){
	  gameState = YAY;

		if (gameState === YAY) {
			fill("black");
			textFont("Comic Sans MS");
			textStyle(BOLD);
			textSize(40);
			text("YAY! You did it!", 600, 50);
		  }

	}
	 
}

