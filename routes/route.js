const express = require("express");
const tempController = require("../controllers/tempController");
const dateController = require("../controllers/dateController");
const servoController = require("../controllers/servoController");
const ultrasonicController = require("../controllers/ultrasonicController");
const valvulaController = require("../controllers/valvulaController");
const ledController = require("../controllers/ledController");
const phController = require("../controllers/phController");
const waterPumpController = require("../controllers/waterPumpController");
const heaterController = require("../controllers/heaterController"); // nuevo
const servoBicarbController = require("../controllers/servoBicarbController"); // nuevo
const luzController = require("../controllers/luzController");

const router = express.Router();

// temperatura
router.post("/api/logTemp/:deviceID/:temperature", tempController.logTemp);
router.get("/api/getTempLogs/:deviceID", tempController.getLogs);

// fecha y servo
router.post("/api/dateTemp/:deviceID", dateController.logDate);
router.get("/api/getDate/:deviceID", dateController.getDate);
router.post("/api/servoTemp/:deviceID", servoController.logServo);
router.get("/api/getServo/:deviceID", servoController.getServo);

//led
router.post("/api/logLED/:deviceID/:status", ledController.logLED);
router.get("/api/getLED/:deviceID", ledController.getLed);
//ultrasonico
router.post(
  "/api/logultrasonic/:deviceID/:distancia",
  ultrasonicController.logultrasonic
);
router.get("/api/getUltrasonic/:deviceID", ultrasonicController.getLogs);

//valvula
router.post("/api/logvalvula/:deviceID/:valvula", valvulaController.logvalvula);
router.get("/api/getValvula/:deviceID", valvulaController.getLogs);
//ph
router.post("/api/logPh/:deviceID/:ph", phController.logPh);
router.get("/api/getPh/:deviceID", phController.getPhLogs);

//waterPump
router.post(
  "/api/logWaterPumpState/:deviceID/:waterPumpState",
  waterPumpController.logWaterPumpState
);
router.get(
  "/api/getWaterPump/:deviceID",
  waterPumpController.getWaterPumpStateLogs
);

//heater
router.post("/api/logHeater/:deviceID/:status", heaterController.logHeater); // nuevo
router.get("/api/getHeater/:deviceID", heaterController.getHeater); // nuevo

// Nuevo Servo
router.post(
  "/api/logServoBicarb/:deviceID/:servoState",
  servoBicarbController.logServoBicarb
);
router.get(
  "/api/getServoBicarb/:deviceID",
  servoBicarbController.getServoBicarb
);

// Luz
router.post("/api/logLuz/:deviceID/:luz", luzController.logLuz);
router.get("/api/getLuz/:deviceID", luzController.getLuzLogs);

module.exports = router;
