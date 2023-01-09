const mysql = require('mysql');


const db = mysql.createConnection({
    //connectionLimit: 10000,
    host: process.env.BDD_HOST,
    user: process.env.BDD_USER,
    password: process.env.PSW,
    database: process.env.BDD
});

db.connect( (error) =>{
    if(error) {
        console.log(error)
    }else{
        console.log("MySQL est connecté...")
    }
})

module.exports = db;