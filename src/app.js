const express = require('express');
const app = express();
const morgan = require('morgan');
let routes = require("./routes/router");
let movies = require("./routes/movies");

//settings
app.set('port', process.env.PORT || 3000);


//middleware
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//route 

app.use(routes);
app.use("/api/movies",movies);

//Server
app.listen(app.get('port'), ()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});