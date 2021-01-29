var dog
var dogimage
var database
var eatenfood = 0
var foodbf
var dogemotion
var ball
var int = 0
function preload()
{
  dogimage = loadImage('images/dog.png')
}

function setup() {
  createCanvas(800, 700);
  dog = createSprite(400,350,20,30)
  database = firebase.database()
  var foodcontent = database.ref('dog/hunger')
  foodcontent.on('value',food,console.log('Error connecting to firebase database'))
  dog.addImage(dogimage)
  dog.scale = 1/4
}


function draw() {  
  background(255)
  text('The amount of food fed is:',300,100)
  text(eatenfood,500,100)
  if(keyDown(UP_ARROW)){
    database.ref('dog/hunger').set({
      'val':foodbf.val + 1
    })
    
  }
  if(eatenfood>300){
    foodbf.val = 0
  }
  
  drawSprites()
}

food = function(data){
  foodbf = data.val()
  eatenfood = foodbf.val 
  dogemotion = foodbf.emotion
}



