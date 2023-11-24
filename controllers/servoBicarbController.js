const mysql = require("../database/db");
class MainController {
  async logServoBicarb(req, res) {
    console.log(req.params.servoState);
    console.log(req.params.deviceID);
    if (req.params.deviceID != null && req.params.servoState != null) {
      let deviceID = req.params.deviceID;
      let servo = req.params.servoState;
      const sql = `insert into log_servo_bicarbonato (device_id, estado) values (${deviceID}, ${servo});`;
      mysql.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500);
          res.send(error.message);
        } else {
          console.log(data);
          res.json({
            status: 200,
            message: "Servo Bicarb Log uploaded successfully",
            affectedRows: data.affectedRows,
          });
        }
      });
    } else {
      res.send("Por favor llena todos los datos!");
    }
  }

  async getServoBicarb(req, res) {
    console.log(req.params.deviceID);
    if (req.params.deviceID != null) {
      let deviceID = req.params.deviceID;
      const sql = `select * from log_servo_bicarbonato where device_id = ${deviceID} order by device_id desc;`;
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
const servoBicarbController = new MainController();
module.exports = servoBicarbController;
