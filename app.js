var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
// const multer = require('multer');
// const upload = multer({dest: 'public/uploads/'});
// const { uploadForRecipe } = require('./libs/multer');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const ingredientRouter = require('./routes/ingredient.routes');
const levelRouter = require('./routes/level.routes');
const recipeRouter = require('./routes/recipe.routes');
const measureRouter = require('./routes/measure.routes');
const equipmentRouter = require('./routes/equipment.routes');
const categoryRouter = require('./routes/category.routes');


const cors = require('cors');

var app = express();

require('./dbconexion');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(cors({origin: 'http://localhost:4200'}));
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

// RECIBIR INFO DE FORMULARIOS DE DISTINTOS TIPOS
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'angela-kitchen-app')));

// app.use(uploadForRecipe.single('recipeImage'));

// Routers
// IMPORTANT: take care of the order, it solves first the first match.
app.use('/api/ingredient', ingredientRouter);
app.use('/api/level', levelRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/measure', measureRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/category', categoryRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

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



