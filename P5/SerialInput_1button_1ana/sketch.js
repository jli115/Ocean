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
  line(map(sensor2,0,500,0,670),0,map(sensor2,0,500,0,670),height); // draw vertical line  at the X position of the cursor
text("I am calling on protecting the ocean here.",map(sensor2,0,500,0,670),map(sensor3,0,500,0,350)+150);
 
   if(sensor1==0 )
  {
  image(imgj,0,0,imgj.width/3, imgj.height/3);
  songj.play();
  }
    else
    {
        songj.stop();
    }

   if(sensor4==0 )
  {
  image(imgt,800,300,imgt.width/3, imgt.height/3);
  songt.play();
  }
    else
    {
        songt.stop();
    }
    
   if(sensor5==0 )
  {
  image(imgm,400,400,imgm.width/3, imgm.height/3);
  songm.play();
  }
    else
    {
        songm.stop();
    }
  
    var mapNum1, mapNum2;
    mapNum1 = map(sensor2,0,1023,0,window.innerWidth);
    mapNum2 = map(sensor3,0,1023,0,window.innerHeight);
    
  image(imgp, mapNum1, mapNum2,imgp.width/15, imgp.height/15);
    
    if((mapNum1 >= 400) && (mapNum1 <= 600)){
        if((mapNum2 >= 1200) && (mapNum2 <= 1600) ){
              image(imgc,400,400,imgc.width/3, imgc.height/3);
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


