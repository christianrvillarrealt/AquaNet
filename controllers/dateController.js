const mysql = require("../database/db");
class MainController {
  async logDate(req, res) {
    console.log(req.query.date);
    console.log(req.params.deviceID);
    if (req.params.deviceID != null && req.query.date != null) {
      let deviceID = req.params.deviceID;
      let date = req.query.date;
      var sql = `insert into log_time (device_id, date) values (${deviceID}, '${date}');`;
      mysql.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500);
          res.send(error.message);
        } else {
          console.log(data);
          res.json({
            status: 200,
            message: "Date Log uploaded successfully",
            affectedRows: data.affectedRows,
          });
        }
      });
    } else {
      res.send("Por favor llena todos los datos!");
    }
  }
}
const dateController = new MainController();
module.exports = dateController;
