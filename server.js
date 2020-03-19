const express = require('express'); // express is a module that works with nodejs
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const container = require('./container');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const cron = require('node-cron');
//const axios = require('axios');

const MongoClient = require('mongodb').MongoClient;

container.resolve(function(index, scrap_fun){ // brings the modules from the container. we run everyting in here
  // adding mongoose connection to the database
  mongoose.Promise = global.Promise;
  //process.env.MONGO_URI
  mongoose.connect(  "mongodb+srv://ntheodoropoulos:nikblod1@cluster0-cfrox.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true })

  const db = mongoose.connection;

  db.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

  const app = SetupExpress();

  function SetupExpress(){
    const app = express();
    const server = http.createServer(app);

    cron.schedule("0 */4 * * *", function(){
    console.log('Data Collect', Date());
    scrap_fun.webScrapFUN();
    });


    server.listen(process.env.PORT || 3001, function(){
      console.log('Listening on port 3001');
    });
    ConfigureExpress(app);

    // setting up ROUTERS
    const router = require('express-promise-router')();
    index.SetRouting(router);


    app.use(router);
    app.use(function(req, res){
      res.render('404');
    });
  }


  function ConfigureExpress(app){

    app.use(compression());
    app.use(helmet());
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(session({ // allows to save sessions
      secret: "thisisasecretkey",//process.env.SECRET_KEY,
      resave: true,
      saveUninitialized: true,
      saveInitialized: true,
      store: new MongoStore({mongooseConnection: mongoose.connection}) // save data to database
    }))


  }

});
