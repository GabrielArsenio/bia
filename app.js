const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://192.168.99.100:27017';
const MONGO_DBNAME = process.env.MONGO_DBNAME || 'bia';
const MONGO_USER = process.env.MONGO_USER || '';
const MONGO_PASS = process.env.MONGO_PASS || '';

const MONGO_OPTIONS = {
    dbName: MONGO_DBNAME,
    user: MONGO_USER,
    pass: MONGO_PASS,
    auth: process.env.MONGO_DBNAME ? { authdb: MONGO_DBNAME } : null
};

console.log('MONGO_URI: ', MONGO_URI);
console.log('MONGO_OPTIONS: ', MONGO_OPTIONS);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/api', routes);

mongoose.connect(MONGO_URI, MONGO_OPTIONS);

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
