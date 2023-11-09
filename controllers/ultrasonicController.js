const mysql = require('../database/db')

class MainController {

    async logultrasonic(req, res){
        console.log(req.params.distancia)
        console.log(req.params.deviceID)
        if(req.params.deviceID != null && req.params.distancia != null) {
            let deviceID = req.params.deviceID
            let distancia = req.params.distancia;
            var sql = `insert into log_ultrasonic (log_date, device_id, distancia) values (now(), ${deviceID}, ${distancia});`
            mysql.query(sql, (error,data,fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Log uploaded successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else {
          res.send('Por favor llena todos los datos!')
        }
    }
    
    async getLogs(req,res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID!=null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_ultrasonic where device_id='${deviceID}'`
            mysql.query(sql, (error, data, fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        data
                    })
                }
            })
        }
    }
}

const ultrasonicController = new MainController()
module.exports = ultrasonicController;