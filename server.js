//Requires
const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');

//Static Routes
// app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(__dirname + '/client'));
app.use(morgan('dev')) // logging

// Parse application body as JSON - does this have to do with geting req from posts and shit
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Main App Route
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, './client/index.html')));

// routes
var routes = require("./routes");

app.use(routes);

//========================================================================================================
const port = 1337;
//Run Server
app.listen(process.env.PORT || port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));