//creating variables for the helicopter/image and the package/image
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;

//creating a variable for the object
var packageBody,ground

//creating an object, a physical world and a physical body.
//writing all of them in matter because all of these things are written in the matter library
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	//loading the images for each sprite
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);

	//making sure the rectangle in is the center of the screen.
	rectMode(CENTER);
	
    //creating sprites for each sprite(helicopter/package)
	packageSprite=createSprite(width/2, 80, 10,10);
	//adding the image
	packageSprite.addImage(packageIMG)
	//adjusting the size
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6
	
	//creating the ground sprite and adding the color
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

    //physically creating an objetc and putting it in a physical world.
	engine = Engine.create();
	world = engine.world;
	  
	//giving the package sprite a physical body in a shape of a circle.
	//adding the radius and making the restitution 1 and isStatice:true.
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0, isStatic:true});
	//restitution: the bounciness of a ball.
	//isStatic: not moving.

	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	 World.add(world, ground);
	 
	 //ALWAYS! : THE SEQUENCE MATTERS!
	 //positions
	 boxPosition=width/2-100
 	boxY=610;

    //creating the sprites
 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor="red";

	 //adding a physical body to it.
	 //the +20 is there for whatever position there is it has to add up by 20.
 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);
 
	//the same goes for the others.
 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor="red";

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor="red";

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);
 	
    //making the package bounce
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);


  //giving the positons 
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  drawSprites();
 
}

function keyPressed() {

//making sure that when the down arrow is pressed, the package should be released and it should bounce before stopping.
 if (keyCode === DOWN_ARROW) {
Matter.Body.setStatic(packageBody);
}
}
