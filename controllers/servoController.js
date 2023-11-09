const mysql = require("../database/db");
class MainController {
  async logServo(req, res) {
    console.log(req.query.servo);
    console.log(req.params.deviceID);
    if (req.params.deviceID != null && req.query.servo != null) {
      let deviceID = req.params.deviceID;
      let servo = req.query.servo;
      var sql = `insert into log_servo (movimiento, device_id) values ('${servo}', ${deviceID});`;
      mysql.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500);
          res.send(error.message);
        } else {
          console.log(data);
          res.json({
            status: 200,
            message: "Servo Log uploaded successfully",
            affectedRows: data.affectedRows,
          });
        }
      });
    } else {
      res.send("Por favor llena todos los datos!");
    }
  }
}
const servoController = new MainController();
module.exports = servoController;
