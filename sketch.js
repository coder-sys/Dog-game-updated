var dog
var dogimage
var database
var eatenfood = 0
var foodbf
var dogemotion
var ball
var int = 0
let fetchapi
let fetchapijson
let hr 
let time_val
let milk_array = []
var milk
let len=0
let as = 0
let g
let othertime
let ft,ftjson
function preload()
{
  dogimage = loadImage('images/dog.png')
  milk = loadImage('images/Milk.png')
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
  timeval()
  if(keyCode===32){
    m = createSprite(200,300,10,10)
    m.addImage(milk)
    m.scale = 0.2
    m.y += 40
    console.log(m.y)
    getHour()
    milkUpdate(int(1))
  }
  text(time_val,300,400)
  text(eatenfood,500,100)
  if(keyDown(UP_ARROW)){
    database.ref('dog/hunger').set({
      'val':foodbf.val + 1
    })
    
  }
  if(eatenfood>300){
    foodbf.val = 0
  }
  text(hr,400,200)
  if(as > 13){
    as = 0
  }
  drawSprites()
}


food = function(data){
  foodbf = data.val()
  eatenfood = foodbf.val 
  dogemotion = foodbf.emotion
}
async function getHour(){
  fetchapi = await fetch('http://worldtimeapi.org/api/timezone/America/Los_angeles')
  fetchapijson = await fetchapi.json()
  hr = fetchapijson.datetime.slice(11,13)
  database.ref('milk').update({
    'milk_fed_time':hr
  })
}
function milkUpdate(s){
  database.ref('milk').update({
    milk_time:as+=s
  })
}
function timeval(){
  var milklenref = database.ref('milk')
  milklenref.on('value',td) 
}
function td(data){
  g = data.val()
  as = g.milk_time
}