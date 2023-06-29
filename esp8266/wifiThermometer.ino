#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include "DHT.h"
#define DHT_TYPE DHT22

const int DHT_PIN = 5;
const char* ssid = "<SSID>";
const char* password = "<PASSWORD>";
DHT dht(DHT_PIN, DHT_TYPE);

String serverName = "http://<SERVER_HOST>:<PORT>/samples";

unsigned long lastTime = 0;
// Set timer to 60 seconds (60000 ms)
unsigned long timerDelay = 60000;

void setup() {
  Serial.begin(115200);
  dht.begin();

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 60 seconds (timerDelay variable), it will take 60 seconds before publishing the first reading.");
}

void loop() {
  //Send an HTTP POST request every minute
  if ((millis() - lastTime) > timerDelay) {
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
      float h = dht.readHumidity();
      float t = dht.readTemperature();
      
      http.begin(client, serverName);
  
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST("{\"temperature\": " + String(t) + ", \"humidity\": " + String(h) + "}");

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}