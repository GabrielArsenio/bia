const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

var app = express();

mongoose.connect('mongodb://localhost:27017/bia');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/api', routes);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function () {
  console.log('Conectado ao mongoDB!');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
