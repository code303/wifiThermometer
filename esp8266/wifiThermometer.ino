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
WiFiClient client;

void connectToWiFi() {
  if (WiFi.status() == WL_CONNECTED) {
    return;
  }

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");

  unsigned long startAttempt = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startAttempt < 20000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("");
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("");
    Serial.println("WiFi connection failed");
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();

  connectToWiFi();
  Serial.println("Timer set to 60 seconds (timerDelay variable), it will take 60 seconds before publishing the first reading.");
}

void loop() {
  //Send an HTTP POST request every minute
  if ((millis() - lastTime) > timerDelay) {
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("WiFi disconnected, attempting reconnect");
      connectToWiFi();
    }

    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      float h = dht.readHumidity();
      float t = dht.readTemperature();

      if (isnan(h) || isnan(t)) {
        Serial.println("Failed to read from DHT sensor");
        lastTime = millis();
        return;
      }

      char payload[96];
      int payloadLength = snprintf(payload, sizeof(payload), "{\"temperature\":%.2f,\"humidity\":%.2f}", t, h);

      if (payloadLength <= 0 || payloadLength >= static_cast<int>(sizeof(payload))) {
        Serial.println("Payload preparation failed");
        lastTime = millis();
        return;
      }
      
      http.begin(client, serverName);
  
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(reinterpret_cast<uint8_t*>(payload), payloadLength);

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
      client.stop();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}