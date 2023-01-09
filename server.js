const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const passport = require('passport');
//const {body, validationResult} = require('express-validator');
const flash = require('connect-flash');
const fileupload = require('express-fileupload');
const cors = require('cors');


dotenv.config({ path: './.env'});

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(fileupload());

app.use("/js", express.static(__dirname + "./client/js"));
app.use("/css", express.static(__dirname + "./client/css"));
app.use("/images", express.static(__dirname + "./client/images"));
// app.use("/images", express.static(__dirname + "./client/images"));
// app.use("/images", express.static(__dirname + "./client/images/img_events"));
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "ejs");


const publicDirectory = path.join(__dirname, './client');
app.use(express.static(publicDirectory));

// Les routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/edit', require('./routes/editRoutes'));




  

app.listen(8000, ()=>{
    console.log("le serveur est exécuté sur le port http://localhost:8000");
})
