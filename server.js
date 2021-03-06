var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//require in my routes
require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app)




app.listen(PORT, function(){
	console.log("App listening on PORT: " + PORT);
});