//Notas: El relay esta conectado a D1 y el sensor a D4

#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>


const int relay = 5; // relay
#define ONE_WIRE_BUS 2  // sensor

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// WiFi configuration
const char* ssid = "Tec-IoT";           // Change to your WiFi network SSID
const char* password = "spotless.magnetic.bridge";  // Change to your WiFi network password

// HTTPClient and WiFiClient objects
HTTPClient httpClient;
WiFiClient wClient;

String URL = "http://10.22.140.121:3100";  // Change to your database URL

int relayState = 0;  // Initialize the relay state variable to 0 (inactive)

void setup() {
  Serial.begin(9600);
  pinMode(relay, OUTPUT);
  Serial.println("***Inicializando conexión a MySQL***");

  // Initialize DallasTemperature sensor
  sensors.begin();

  // Connect to WiFi
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  WiFi.begin(ssid, password);
  Serial.print("Conectando a red WiFi \"");
  Serial.print(ssid);
  Serial.print("\"");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nConectado! IP: ");
  Serial.println(WiFi.localIP());
  delay(500);
}

void logHeaterState(int state) {
  if (WiFi.status() == WL_CONNECTED) {
    String endpoint = "/api/logHeater/1/" + String(state);  // Cambia el 1 por el ID de tu dispositivo si es diferente
    String data = URL + endpoint;
    Serial.println(data);

    httpClient.begin(wClient, data.c_str());
    httpClient.addHeader("Content-Type", "application/json");
    int httpResponseCode = httpClient.POST("");  // Usar una cadena vacía para la solicitud POST
    Serial.println(httpResponseCode);
    httpClient.end();
  }
}

void logIntento(float t) {
  if (WiFi.status() == WL_CONNECTED) {
    String endpoint = "/api/logTemp/1/" + String(t);
    String data = URL + endpoint;
    Serial.println(data);

    httpClient.begin(wClient, data.c_str());
    httpClient.addHeader("Content-Type", "application/json");
    int httpResponseCode = httpClient.POST("");  // Use an empty string for the POST request
    Serial.println(httpResponseCode);
    httpClient.end();
  }
  return;
}

void loop() {
  // Read temperature from DallasTemperature sensor
  sensors.requestTemperatures();
  float tDallas = sensors.getTempCByIndex(0);

  if (tDallas != DEVICE_DISCONNECTED_C) {
    Serial.print("Temperatura Dallas: ");
    Serial.print(tDallas);
    Serial.print(" ºC\t");

    // Check temperature and control the relay
    if (tDallas >= 30) {
      digitalWrite(relay, LOW);  // Activate the relay
      Serial.println("Relay activated (Current Flowing)");
      relayState = 1;  // Update the relay state variable to 1 (active)
    } else {
      digitalWrite(relay, HIGH);  // Deactivate the relay
      Serial.println("Relay deactivated (Current not Flowing)");
      relayState = 0;  // Update the relay state variable to 0 (inactive)
    }

    // Upload data to the database
    logIntento(tDallas);
    logHeaterState(relayState);
  } else {
    Serial.println("Error: Could not read temperature data from DallasTemperature sensor");
  }

  delay(6000);  // Delay for 1 minute (60,000 milliseconds) before the next iteration
}
