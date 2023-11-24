const mysql = require("../database/db");

class HeaterController {
  async logHeater(req, res) {
    console.log(req.params.deviceID);
    console.log(req.params.status);
    if (req.params.deviceID != null && req.params.status != null) {
      let deviceID = req.params.deviceID;
      let status = req.params.status;
      var sql = `INSERT INTO log_heater (log_date, device_id, estado) VALUES (NOW(), ${deviceID}, ${status});`;
      mysql.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500);
          res.send(error.message);
        } else {
          console.log(data);
          res.json({
            status: 200,
            message: "Heater state logged successfully",
            affectedRows: data.affectedRows,
          });
        }
      });
    } else {
      res.send("Por favor llena todos los datos!");
    }
  }

  async getHeater(req, res) {
    console.log(req.params.deviceID);
    if (req.params.deviceID != null) {
      let deviceID = req.params.deviceID;
      var sql = `SELECT * FROM log_heater WHERE device_id = ${deviceID} ORDER BY device_id DESC;`;
      mysql.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500);
          res.send(error.message);
        } else {
          console.log(data);
          res.json({
            status: 200,
            data: data,
          });
        }
      });
    } else {
      res.send("Por favor llena todos los datos!");
    }
  }
}

const heaterController = new HeaterController();
module.exports = heaterController;
