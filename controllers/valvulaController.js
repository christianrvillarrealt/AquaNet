const mysql = require("../database/db");

class MainController {
  async logvalvula(req, res) {
    console.log(req.params.valvula);
    console.log(req.params.deviceId);
    if (req.params.deviceID != null && req.params.valvula != null) {
      let deviceID = req.params.deviceID;
      let valvula = req.params.valvula;
      var sql = `insert into log_valvula (log_date, device_id, valvula) values (now(), ${deviceID}, ${valvula});`;
      mysql.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500);
          res.send(error.message);
        } else {
          console.log(data);
          res.json({
            status: 200,
            message: "Log uploaded successfully",
            affectedRows: data.affectedRows,
          });
        }
      });
    } else {
      res.send("Por favor llena todos los datos!");
    }
  }

  async getLogs(req, res) {
    console.log("Get Logs");
    console.log(req.params.deviceID);
    if (req.params.deviceID != null) {
      let deviceID = req.params.deviceID;
      var sql = `SELECT * FROM log_valvula where device_id='${deviceID}'`;
      mysql.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500);
          res.send(error.message);
        } else {
          console.log(data);
          res.json({
            data,
          });
        }
      });
    }
  }
}

const valvulaController = new MainController();
module.exports = valvulaController;
