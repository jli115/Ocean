var serial;       //variable to hold the serial port object

var sensor1;      //buttonj: this variable will hold the value from "s1"
var sensor2;      //protentiometer: this variable will hold the value from "s2"
var sensor3;      //protentiometer: this variable will hold the value from "s3"
var sensor4;      //buttont:  this variable will hold the value from "s4"
var sensor5;      //buttonm:  this variable will hold the value from "s5"

var songj;
var songt;
var songm;

var imgmap;
var imgj;
var imgm;
var imgt;
var imgp;
var imga;
var imgc;
var imgu;

var serialPortName = "/dev/cu.usbmodem1411";  //FOR PC it will be COMX on mac it will be something like "/dev/cu.usbmodemXXXX"
                              //Look at P5 Serial to see the available ports

function preload(){
   songj = loadSound("sj.mp3");
   songt = loadSound("st.mp3");
   songm = loadSound("sm.mp3");
   sea = loadSound("sea.mp3");

   imgmap = loadImage("imap.png");
   imgj = loadImage("ij.png");
   imgt = loadImage("it.png");
   imgm = loadImage("im.png");
    
   imga = loadImage("a.png");
   imgc = loadImage("c.png");
   imgu = loadImage("u.png");
    
   imgp = loadImage("ip.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //Setting up the serial port
  serial = new p5.SerialPort();     //create the serial port object
  serial.open(serialPortName); //open the serialport. determined 
  serial.on('open',ardCon);         //open the socket connection and execute the ardCon callback
  serial.on('data',dataReceived);   //when data is received execute the dataReceived function
}




function draw() {
  stroke(200);      //black lines
  image(imgmap,0,0, imgmap.width/2, imgmap.height/2);
  stroke(200);      //black lines
  line(0,map(sensor3,0,500,0,350)+100,width,map(sensor3,0,500,0,350)+100);  // draw horizontal line  at the Y position of the cursor
<<<<<<< HEAD
  line(map(sensor2,0,500,0,670)+40,0,map(sensor2,0,500,0,670)+40,height); // draw vertical line  at the X position of the cursor
    
fill(255);                       
stroke(10); 
textSize(20);
textAlign(LEFT);   
text("I am calling on protecting the ocean here.",map(sensor2,0,500,0,670)+50,map(sensor3,0,500,0,350)+100);
=======
  line(map(sensor2,0,500,0,670),0,map(sensor2,0,500,0,670),height); // draw vertical line  at the X position of the cursor
text("I am calling on protecting the ocean here.",map(sensor2,0,500,0,670),map(sensor3,0,500,0,350)+150);
>>>>>>> 1e889d1cd94f73996faf2ce71e3cb76ff82b1e87
 
   if(sensor1==0 )
  {
  image(imgj,0,0,imgj.width/3, imgj.height/3);
  if ( songj.isPlaying() ) { 
    songj.stop();
  } else {
    songj.play();
    
  }
  }

   if(sensor4==0 )
  {
  image(imgt,800,300,imgt.width/3, imgt.height/3);
    if ( songm.isPlaying() ) { 
    songm.stop();
  } else {
    songm.play();
  }
  }

    
   if(sensor5==0)
  {
  image(imgm,400,400,imgm.width/3, imgm.height/3);
  if ( songt.isPlaying() ) { 
    songt.stop();
  } else {
    songt.play();
  }
  }
    
  
    var mapNum1, mapNum2;
    mapNum1 = map(sensor2,0,1023,0,window.innerWidth);
    mapNum2 = map(sensor3,0,1023,0,window.innerHeight);
    
  image(imgp, mapNum1, mapNum2,imgp.width/15, imgp.height/15);
    
    if((mapNum1 >= 0) && (mapNum1 <= (500/2))){
        if((mapNum2 >= 0) && (mapNum2 <= (400/2)) ){
              image(imga,100,200,imga.width/3, imga.height/3);
        }
       }
    if((mapNum1 >= 500/2) && (mapNum1 <= (800/2))){
        if((mapNum2 >= 400/2) && (mapNum2 <= (800/2)) ){
              image(imgu,150,200,imgu.width/3, imgu.height/3);
        }
       }
    if((mapNum1 >= 2000/2) && (mapNum1 <= (2400/2))){
        if((mapNum2 >= 450/2) && (mapNum2 <= (800/2)) ){
              image(imgc,950,200,imgc.width/3, imgc.height/3);
        }
       }

}

function mousePressed() {
  if ( sea.isPlaying() ) { // .isPlaying() returns a boolean
    sea.stop();
  } else {
    sea.play();
  }
}

function dataReceived()   //this function is called every time data is received
{
  
var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    console.log(rawData);                   //uncomment this line to see the incoming string in the console     
    if(rawData.length>1)                      //check that there is something in the string
    {                                         
      
      sensor1 = JSON.parse(rawData).s1;       //the parameter value .s1 must match the parameter name created within the arduino file
      sensor2 = JSON.parse(rawData).s2; 
      sensor3 = JSON.parse(rawData).s3; 
      sensor4 = JSON.parse(rawData).s4; 
      sensor5 = JSON.parse(rawData).s5;
    }
}

function ardCon()
{
  console.log("connected to the arduino!! Listen UP");
}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight); 
}


