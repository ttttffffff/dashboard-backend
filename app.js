var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session=require('express-session')
const MongoStore=require('connect-mongo')

//导入account接口路由文件
const calendarRouter=require('./routes/api/initial_events')
const usersRouter=require('./routes/api/users')
const boardRouter=require('./routes/api/board')
var app = express();
// app.use(session({
//   name:'sid',
//   secret:'wyt',
//   saveUninitialized:false,
//   resave:true,
//   store:MongoStore.create({
//     mongoUrl:'mongodb://127.0.0.1:27017/dashboard'
//   }),
//   cookie:{
//     httpOnly:true,
//     maxAge:1000*60*50
//   }
// }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', authRouter);
app.use('/api',calendarRouter)
app.use('/api',usersRouter)
app.use('/api',boardRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
