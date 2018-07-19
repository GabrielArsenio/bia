console.log('========================= BIA =========================')

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const auth = require('./routes/auth');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bia';

console.log('MONGODB_URI: ', MONGODB_URI);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/api', routes);
app.use('/auth', auth);

mongoose.connect(MONGODB_URI);
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
