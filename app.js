var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = module.exports = express();

var routes = require('./routes/index');
var api = require('./routes/api');

//connect to mongoDB
var database_name = 'gym-buddy';
var database_uri = 'mongodb://localhost/' + database_name;
mongoose.connect(database_uri);

//config
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('env', process.env.NODE_ENV || 'dev');
app.use(bodyParser.json());

//static content
app.use('/static', express.static(__dirname + '/dist'));

//routes
app.get('/', routes.index);


//api
app.post('/api/exercise', api.createExercise);
app.put('/api/exercise/:id', api.editExercise);
app.get('/api/exercise', api.getExercises);
app.get('/api/exercise/:id', api.getExercise);
app.delete('/api/exercise/:id', api.deleteExercise);

app.post('/api/workoutSessionTemplate', api.createWorkoutSessionTemplate);
//app.put('/api/workoutSessionTemplate/:id', api.editWorkoutSessionTemplate);
app.get('/api/workoutSessionTemplate', api.getWorkoutSessionTemplates);
app.get('/api/workoutSessionTemplate/:id', api.getWorkoutSessionTemplate);
app.delete('/api/workoutSessionTemplate/:id', api.deleteWorkoutSessionTemplate);

//app.post('/api/workoutSession', api.createWorkoutSession);
//app.put('/api/workoutSession/:id', api.editWorkoutSession);
//app.get('/api/workoutSession', api.getWorkoutSession);
//app.get('/api/workoutSession/:id', api.getWorkoutSession);
//app.delete('/api/workoutSession/:id', api.deleteworkoutSession);

//app.post('/api/workout', api.createWorkout);
//app.put('/api/workout/:id', api.editWorkout);
//app.get('/api/workout', api.getWorkout);
//app.get('/api/workout/:id', api.getWorkout);
//app.delete('/api/workout/:id', api.deleteWorkout);


//only start server if called from command line
if (require.main === module) {
    app.listen(app.get('port'), function() {
        console.log('[' + app.get('env') + '] Server listening on port ' + app.get('port'));
    });
}
