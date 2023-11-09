const express = require("express");
const tempController = require("../controllers/tempController");
const dateController = require("../controllers/dateController");
const servoController = require("../controllers/servoController");
const ultrasonicController = require("../controllers/ultrasonicController");
const valvulaController = require("../controllers/valvulaController");
const ledController = require("../controllers/ledController");
const phController = require("../controllers/phController");
const waterPumpController = require("../controllers/waterPumpController");
const router = express.Router();

router.get("/api/getLogs/:deviceID", tempController.getLogs);
router.post("/api/logTemp/:deviceID/:temperature", tempController.logTemp);
router.post("/api/dateTemp/:deviceID", dateController.logDate);
router.post("/api/servoTemp/:deviceID", servoController.logServo);
router.post("/api/logLED/:deviceID/:status", ledController.logLED);
//ultrasonic
router.get("/api/getLogs/:deviceID", ultrasonicController.getLogs);
router.post(
  "/api/logultrasonic/:deviceID/:distancia",
  ultrasonicController.logultrasonic
);
//valvula
router.get("/api/getLogs/:deviceID", valvulaController.getLogs);
router.post("/api/logvalvula/:deviceID/:valvula", valvulaController.logvalvula);

router.post("/api/logPh/:deviceID/:ph", phController.logPh);
router.post(
  "/api/logWaterPumpState/:deviceID/:waterPumpState",
  waterPumpController.logWaterPumpState
);

module.exports = router;
