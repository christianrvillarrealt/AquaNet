// Node.js module that defines a controller for handling HTTP requqests related
// to logging data in a database using MySQL.

const mysql = require('../database/db') // Imports the MySQL database connection

// Main Controller class with 2 asynchronous methods
class wPumpController {
    // logWaterPumpState is a method that handles the insertion of water pump state (0, 1) data into the database
    // It expects 2 parameters in the request object: req.params.deviceID and req.params.water_pump_state
    async logWaterPumpState(req, res){
        console.log(req.params.waterPumpState)
        console.log(req.params.deviceID)
        if(req.params.deviceID != null && req.params.waterPumpState != null) {
            let deviceID = req.params.deviceID // Sets the deviceID variable to the deviceID from the parameter attribute of the request
            let waterPumpState = req.params.waterPumpState; // Sets the water pump state variable to the water pump state value of the params attribute of the request
            var sql = `insert into log_bomba_agua (log_date, device_id, estado) values (now(), ${deviceID}, ${waterPumpState});`
            // SQL query that updates the water_pump_state_date, device_id and water_pump_state of the log_water_pump table
            // Executes the formed query with the mysql connection specified by the sql variable
            // A callback function is taken with 3 parameters: error (holds any potential error during the execution
            // of the query), data (contains the result of the successful query) and fields (information about
            // the fields in the result set)
            mysql.query(sql, (error,data,fields) => {
                // If there is an error
                if(error) {
                    res.status(500) // Sets the HTTP response status code to 500 (indicating an internal server error)
                    res.send(error.message) // Sends the error message as a response
                } 
                // If there was no present error
                else {
                    console.log(data) // The query result is logged to the console
                    // JSON response is sent back to the client including a success message and any relevant data
                    res.json({
                        status: 200, // '200' indicates a successful HTTP response with status code of 200
                        message: "Log uploaded successfully", // Message indicating successful log operation
                        affectedRows: data.affectedRows // The number of affected rows as returned by the database query
                    })
                }
            })
        } else {
          res.send('Por favor llena todos los datos!') // If all fields weren't filled with data, this message is printed
        }
    }
    // Asynchronous function that expects 2 parameters: 'req' (the request object) and 'res' (the response object). It
    // handles an HTTP GET request to receive pH logs for a specific device
    async getWaterPumpStateLogs(req,res){
        console.log("Get Logs") // Logs a message to the console indicating that the function is being executed
        console.log(req.params.deviceID) // Logs the deviceID parameter from the request's URL parameters to display the deviceID being requested
        // If the deviceID parameter is not null, it ensures that a deviceID has been provided in the request
        if(req.params.deviceID!=null){
            let deviceID = req.params.deviceID; // The value of deviceID is assigned to the deviceID variable
            // from the request URL's parameters
            var sql = `select * from log_bomba_agua where device_id='${deviceID}';` // SQL query string for the retrieval
            // of all records from the log_ph table where the 'device_id'matches the deviceID obtained from the request
            // The SQL query is executed using the mysql connection and passes a callback function to handle the result of the query
            mysql.query(sql, (error, data, fields) => {
                // If there is an error during execution of the query, it sets the HTTP response status code to 500
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } 
                // If it was successful
                else {
                    console.log(data) // Data of the query result is printed to the console
                    res.json({
                        data
                    }) // JSON response with the retrieved data is sent back to the client
                }
            })
        }
    }
}

const waterPumpController = new wPumpController() // New instance of the MainController class
// by calling its constructor with the new keyword. This is for the phController
module.exports = waterPumpController; // The phController instance of MainController is exported
// as a module that can be used in 'route.js'
// This allows other modules to access and use the metods and functionality of the MainController class
// and the instance made here