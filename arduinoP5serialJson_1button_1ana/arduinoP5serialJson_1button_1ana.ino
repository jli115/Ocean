/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Send 2 values to P5.js
 * values are formatted as JSON objects
 * This example reads 1 button and 1 analog value  
 * 
 * 
 */
#include <ArduinoJson.h>
//*****BE SURE TO INSTALL VERSION 5.13.3 OF THE LIBRARY IT INSTALL V6BETA BY DEFAULT 


int buttonPin1 = 11;
int analogInPin1 = A0;
int analogInPin2 = A2;
int buttonPin2 = 10;
int buttonPin3 = 9;

unsigned long lastSend;
int sendRate = 50;
void setup() 
{
  Serial.begin(9600);                                     //turn on the serial port
  pinMode(buttonPin1,INPUT_PULLUP); 
  pinMode(buttonPin2,INPUT_PULLUP); 
  pinMode(buttonPin3,INPUT_PULLUP);   
}

void loop() 

{
  int buttonValue1 = digitalRead(buttonPin1);               //read the button
  int anaValue1 = analogRead(analogInPin1);                 //read the analog value
  int anaValue2 = analogRead(analogInPin2); 
  int buttonValue2 = digitalRead(buttonPin2); 
  int buttonValue3 = digitalRead(buttonPin3); 
  
if(millis()-lastSend>=sendRate)                           //use a timer to stablize the data send
{
////////////////////////////////////////////////////////////send the values to P5 over serial
  DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
  JsonObject& p5Send = messageBuffer.createObject();      //create a JsonObject variable in that buffer       
  
  p5Send["s1"]=buttonValue1;                               //assign buttonValue to the key "s1" in the json object
  p5Send["s2"]=anaValue1;   
  p5Send["s3"]=anaValue2; 
  p5Send["s4"]=buttonValue2;
  p5Send["s5"]=buttonValue3;  
  //assign anaValue to the key "s2" in the json object 

  p5Send.printTo(Serial);                                 //print JSON object as a string
  Serial.println();                                       //print a \n character to the serial port to distinguish between objects

lastSend = millis();
}  

}
