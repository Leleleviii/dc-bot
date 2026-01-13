const mongoose = require("mongoose")
require("dotenv").config();

class Database {
    constructor () {
        this.connection = null;
    }

    connect () {
        console.log("Connecting to database...")

        
            mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).catch((err) =>{
            console.error(err)
        })
        this.connection = mongoose.connection;
        mongoose.connection.on("connected", (err, res)  =>  {
            console.log("Db is ready!")
        })
    }
}

module.exports = Database;