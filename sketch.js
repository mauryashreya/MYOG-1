var dog,sadmonkey,happymonkey, database;
var foodS,foodStock;
var addFood ,feed;
var foodObj,lastfeed;

//create feed and lastFed variable here


function preload(){
sadmonkey=loadImage("sadmonkey.png");
happymonkey=loadImage("hapymonkey.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadmonkey);
  dog.scale=0.25;

  //create feed the dog button here
   feed=createButton("Feed the monkey ");
   feed.position(600,95)
   feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("pink");
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref("Feedtime");
  feedTime.on("value",function(data){
    lastfeed=data.val();
  })
 
  //write code to display text lastFed time here
  fill("red")
   if(lastfeed>12){

     text("last feed : "+lastfeed%12+"pm",300,30)
   }
   else if (lastfeed===0){
     text("last feed : 12am",300,30)
   }
   else{
     text("last feed : "+lastfeed+"am",300,30)
   }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happymonkey);
  foodS--;
  database.ref('/').update({
    Food:foodS,Feedtime:hour()
  })
  //write code here to update food stock and last fed time


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
