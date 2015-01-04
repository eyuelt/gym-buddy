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
      if (!exercise) {
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
    models.Exercise.find(search_options).remove().exec(function (err) {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        res.send(200);
      }
    });
  }
};



exports.createWorkoutSessionTemplate = function(req, res) {
  //{
  //  "name":"Routine A",
  //  "workout_templates": [
  //    "workout_template_id1",
  //    "workout_template_id2"
  //  ]
  //}
  if (!req.body.name) {
    res.send(403);
  } else {
    var name = req.body.name;
    var workout_template_ids = req.body.workout_templates;
    var workout_templates = [];
    for (var i = 0; i < workout_template_ids.length; i++) {
      workout_templates.push(ObjectId(workout_template_ids[i]));
    }
    var workout_session_template = new models.WorkoutSessionTemplate({
      "name": name,
      "workout_templates": workout_templates
    });
    workout_session_template.save(function(err) {
      if (err) { console.log(err); res.send(500); return; }
      res.send(201);
    });
  }
};

exports.editWorkoutSessionTemplate = function(req, res) {
};

exports.getWorkoutSessionTemplates = function(req, res) {
  models.WorkoutSessionTemplate.find(function(err, workout_session_templates) {
    if (err) { console.log(err); res.send(500); return; }
    var result = {};
    result.workoutSessionTemplates = workout_session_templates;
    res.json(result, 200);
  });
};

exports.getWorkoutSessionTemplate = function(req, res) {
  if (!req.params.id) {
    res.send(403);
  } else {
    models.WorkoutSessionTemplate.findOne({'_id':ObjectId(req.params.id)}, function(err, workout_session_template) {
      if (err) { console.log(err); res.send(500); return; }
      if (!workout_session_template) {
        res.send(404);
      } else {
        var result = {};
        result.workoutSessionTemplate = workout_session_template;
        res.json(result, 200);
      }
    });
  }
};

exports.deleteWorkoutSessionTemplate = function(req, res) {
  if (!req.params.id) {
    res.send(403);
  } else {
    var search_options = {'_id':ObjectId(req.params.id)};
    models.WorkoutSessionTemplate.find(search_options).remove().exec(function (err) {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        res.send(200);
      }
    });
  }
};



exports.createWorkoutSession = function(req, res) {
  //{
  //  "template":"template_id"
  //}
  if (!req.body.template) {
    res.send(403);
  } else {
    var template_id = req.body.template;
    models.WorkoutSessionTemplate.findOne({'_id':ObjectId(template_id)}, function(err, template) {
      var workouts = [];
      for (var i = 0; i < template.workout_templates.length; i++) {
        var workout = new models.Workout({
          "template": template.workout_templates[i]
        });
        workouts.push(workout._id);
        models.WorkoutTemplate.findOne({'_id':ObjectId(template.workout_templates[i])}, function(err, workout_template) {
          workout.exercise = workout_template.exercise;
          workout.num_sets = workout_template.num_sets;
          workout.num_reps = workout_template.num_reps;
          workout.weight = 0;
          workout.save(function(err) {
            if (err) { console.log(err); res.send(500); return; }
          });
        });
      }
      var workout_session = new models.WorkoutSession({
        "template": ObjectId(template_id),
        "workouts": workouts
      });
      workout_session.save(function(err) {
        if (err) { console.log(err); res.send(500); return; }
        res.send(201);
      });
    });
  }
};

exports.editWorkoutSession = function(req, res) {
};

exports.getWorkoutSessions = function(req, res) {
  models.WorkoutSession.find(function(err, workout_sessions) {
    if (err) { console.log(err); res.send(500); return; }
    var result = {};
    result.workoutSessions = workout_sessions;
    res.json(result, 200);
  });
};

exports.getWorkoutSession = function(req, res) {
  if (!req.params.id) {
    res.send(403);
  } else {
    models.WorkoutSession.findOne({'_id':ObjectId(req.params.id)}, function(err, workout_session) {
      if (err) { console.log(err); res.send(500); return; }
      if (!workout_session) {
        res.send(404);
      } else {
        var result = {};
        result.workoutSession = workout_session;
        res.json(result, 200);
      }
    });
  }
};

exports.deleteWorkoutSession = function(req, res) {
  if (!req.params.id) {
    res.send(403);
  } else {
    var search_options = {'_id':ObjectId(req.params.id)};
    models.WorkoutSession.findOne(search_options, function (err, workout_session) {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        if (!workout_session) {
          res.send(404);
        } else {
          var workouts = workout_session.workouts;
          for (var i = 0; i < workouts.length; i++) {
            search_options = {'_id':ObjectId(workouts[i])};
            models.Workout.find(search_options).remove().exec();
          }
          workout_session.remove(function(err) {
            if (err) { console.log(err); res.send(500); return; }
            res.send(200);
          });
        }
      }
    });
  }
};



exports.createWorkoutTemplate = function(req, res) {
  //{
  //  "exercise":"exercise_id",
  //  "num_sets":3,
  //  "num_reps":5
  //}
  if (!req.body.exercise) {
    res.send(403);
  } else {
    var exercise_id = req.body.exercise;
    var workout_template = new models.WorkoutTemplate({
      "exercise": ObjectId(exercise_id),
      "num_sets": req.body.num_sets || 0,
      "num_reps": req.body.num_reps || 0
    });
    workout_template.save(function(err) {
      if (err) { console.log(err); res.send(500); return; }
      res.send(201);
    });
  }
};

exports.editWorkoutTemplate = function(req, res) {
};

exports.getWorkoutTemplates = function(req, res) {
  models.WorkoutTemplate.find(function(err, workout_templates) {
    if (err) { console.log(err); res.send(500); return; }
    var result = {};
    result.workoutTemplates = workout_templates;
    res.json(result, 200);
  });
};

exports.getWorkoutTemplate = function(req, res) {
  if (!req.params.id) {
    res.send(403);
  } else {
    models.WorkoutTemplate.findOne({'_id':ObjectId(req.params.id)}, function(err, workout_template) {
      if (err) { console.log(err); res.send(500); return; }
      if (!workout_template) {
        res.send(404);
      } else {
        var result = {};
        result.workoutTemplate = workout_template;
        res.json(result, 200);
      }
    });
  }
};

exports.deleteWorkoutTemplate = function(req, res) {
  if (!req.params.id) {
    res.send(403);
  } else {
    var search_options = {'_id':ObjectId(req.params.id)};
    models.WorkoutTemplate.find(search_options).remove().exec(function (err) {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        res.send(200);
      }
    });
  }
};
