var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var basicRouter = require('./routes/basicFetch');
var userFetch = require('./routes/userFetch');
var timeFetch = require('./routes/timeFetch');
var countryFetch = require('./routes/countryIDFetch');
var trendsFetch = require('./routes/trendsFetch')
var trendListFetch = require('./routes/trendListFetch')
const bodyParser = require('body-parser'); 
  

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

 


/* Consulta basica/ basic Fetch */
app.use('/basicFetch', basicRouter);

/* Consulta con usuario / User associated Fetch */
app.use('/userfetch', userFetch);

/*Consulta con rango de tiempo/ Time range fetch */
app.use('/timeFetch', timeFetch);

/*Consulta de id de pais woeid / woeid fetch */
app.use('/countryFetch', countryFetch);

/*Consulta de tendencias / trends fetch */
app.use('/trendsFetch', trendsFetch);
app.use('/trendListFetch', trendListFetch);



app.use('/', indexRouter);
app.use('/users', usersRouter); 


app.post('/profile', function (req, res, next) {  
  console.log(req.query);
  res.send(req.query)
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(
  function(err, req, res, next) {
  req.setTimeout(1800000);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
