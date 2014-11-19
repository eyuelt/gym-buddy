/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.
  This script will create a local Mongo database on your
  machine if it doesn't already exist. If it does, it will
  clear the User and Event objects from it.
*/

var mongoose = require('mongoose');
var models = require('../models');

//connect to mongoDB
var database_name = 'gym-buddy';
var database_uri = 'mongodb://localhost/' + database_name;
mongoose.connect(database_uri);

// Keep track of how many calls to clear have not yet completed
var unfinishedCount = 0;
unfinishedCount++; //to make sure that it doesn't reach 0 before all clears have begun


clear(models.Exercise);
clear(models.WorkoutSessionTemplate);
clear(models.WorkoutSession);
clear(models.WorkoutTemplate);
clear(models.Workout);


unfinishedCount--; //to make sure that it doesn't reach 0 before all clears have begun

// Clear the passed in model
function clear(modelToClear) {
  unfinishedCount++;
  modelToClear
    .find()
    .remove()
    .exec(onceClear);
}

// Close connection when all clears are done
function onceClear(err) {
  if (err) console.log(err);
  unfinishedCount--;
  if (unfinishedCount <= 0) mongoose.connection.close();
}
