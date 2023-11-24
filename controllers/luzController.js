const mysql = require("../database/db");

class MainController {
  async logLuz(req, res) {
    console.log(req.params.luz);
    console.log(req.params.deviceId);
    if (req.params.deviceID != null && req.params.luz != null) {
      let deviceID = req.params.deviceID;
      let luz = req.params.luz;
      var sql = `insert into log_luz (log_date, device_id, luminosidad) values (now(), ${deviceID}, ${luz});`;
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

  async getLuzLogs(req, res) {
    console.log("Get Logs");
    console.log(req.params.deviceID);
    if (req.params.deviceID != null) {
      let deviceID = req.params.deviceID;
      var sql = `SELECT * FROM log_luz where device_id='${deviceID}'`;
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

const luzController = new MainController();
module.exports = luzController;
