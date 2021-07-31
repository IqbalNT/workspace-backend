var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv').config();
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var apiResponse = require('./helpers/response');
var cors = require('cors');
var app = express();
var http = require("http");

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use('/', indexRouter);
app.use('/api/', apiRouter);

// throw 404 if URL not found
app.all('*', function(req, res) {
	return apiResponse.notFoundResponse(res, 'Page not found');
});

app.use((err, req, res) => {
	if (err.name == 'UnauthorizedError') {
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});


var server = http.createServer(process.env.PORT || 3000);

server.listen(port);

//app.listen(3000);

module.exports = app;
