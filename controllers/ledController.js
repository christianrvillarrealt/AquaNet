const mysql = require("../database/db");

class LedController {
  async logLED(req, res) {
    console.log(req.params.deviceID);
    console.log(req.params.status);
    if (req.params.deviceID != null && req.params.status != null) {
      let deviceID = req.params.deviceID;
      let status = req.params.status;
      var sql = `INSERT INTO log_led (log_date, device_id, estado) VALUES (NOW(), ${deviceID}, ${status});`;
      mysql.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500);
          res.send(error.message);
        } else {
          console.log(data);
          res.json({
            status: 200,
            message: "LED state logged successfully",
            affectedRows: data.affectedRows,
          });
        }
      });
    } else {
      res.send("Por favor llena todos los datos!");
    }
  }
}

const ledController = new LedController();
module.exports = ledController;
