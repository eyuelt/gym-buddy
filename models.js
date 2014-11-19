var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var ExerciseSchema = new Schema({
  "name": String,
  "description": String
  //"increment": { type: Number, default: +5 }
});

var WorkoutSessionTemplateSchema = new Schema({
  "name": String,
  "workout_templates": [ WorkoutTemplateSchema ]
});

var WorkoutSessionSchema = new Schema({
  "template": { type: Schema.ObjectId, ref: 'WorkoutSessionTemplateSchema' },
  "date": { type: Date, default: Date.now },
  "workouts": [ WorkoutSchema ]
});

var WorkoutTemplateSchema = new Schema({
  "exercise": { type: Schema.ObjectId, ref: 'ExerciseSchema' },
  "num_sets": Number,
  "num_reps": Number
});

var WorkoutSchema = new Schema({
  "template": { type: Schema.ObjectId, ref: 'WorkoutTemplateSchema' },
  "exercise": { type: Schema.ObjectId, ref: 'ExerciseSchema' },
  "num_sets": Number,
  "num_reps": Number,
  "weight": Number
});

exports.Exercise = Mongoose.model('Exercise', ExerciseSchema);
exports.WorkoutSessionTemplate = Mongoose.model('WorkoutSessionTemplate', WorkoutSessionTemplateSchema);
exports.WorkoutSession = Mongoose.model('WorkoutSession', WorkoutSessionSchema);
exports.WorkoutTemplate = Mongoose.model('WorkoutTemplate', WorkoutTemplateSchema);
exports.Workout = Mongoose.model('Workout', WorkoutSchema);

