var models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;

exports.createExercise = function(req, res) {
  if (!req.body.name) {
    res.send(403);
  } else {
    var name = req.body.name;
    var description = req.body.description;
    models.Exercise.findOne({'name':name}, function(err, exercise) {
      if (err) { console.log(err); res.send(500); return; }
      if (exercise) {
        //name already taken
        res.send(403);
      } else {
        var new_exercise = new models.Exercise({
          "name": name,
          "description": description
        });
        new_exercise.save(function(err) {
          if (err) { console.log(err); res.send(500); return; }
          res.send(201);
        });
      }
    });
  }
};

exports.editExercise = function(req, res) {
  if (!req.params.id) {
    res.send(403);
  } else {
    var name = req.body.name;
    var description = req.body.description;
    models.Exercise.findOne({'_id':ObjectId(req.params.id)}, function(err, exercise) {
      if (err) { console.log(err); res.send(500); return; }
      if (!exercise) {
        res.send(404);
      } else {
        exercise.name = name;
        exercise.description = description;
        exercise.save(function(err) {
          if (err) { console.log(err); res.send(500); return; }
          res.send(200);
        });
      }
    });
  }
};

exports.getExercises = function(req, res) {
  models.Exercise.find(function(err, exercises) {
    if (err) { console.log(err); res.send(500); return; }
    var result = {};
    result.exercises = exercises;
    res.json(result, 200);
  });
};

exports.getExercise = function(req, res) {
  if (!req.params.id) {
    res.send(403);
  } else {
    models.Exercise.findOne({'_id':ObjectId(req.params.id)}, function(err, exercise) {
      if (err) { console.log(err); res.send(500); return; }
      if (exercise) {
        res.send(404);
      } else {
        var result = {};
        result.exercise = exercise;
        res.json(result, 200);
      }
    });
  }
};

exports.deleteExercise = function(req, res) {
  if (!req.params.id) {
    res.send(403);
  } else {
    var search_options = {'_id':ObjectId(req.params.id)};
    models.Exercise.find(search_options).remove().exec(function (err, exercise) {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        if (!exercise) {
          res.send(404);
        } else {
          res.send(200);
        }
      }
    });
  }
};
