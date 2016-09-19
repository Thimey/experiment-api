var Experiment = require('./experiment.model');

exports.create = function (req, res) {
    console.log('body', req.body);
    var newExperiment = new Experiment(req.body);
    newExperiment.saveAsync()
        .then(function (experiment) {
            res.status(200).json(experiment);
        })
        .catch(function(err) {
            console.log('err', err);
        })
};

exports.getAll = function (req, res) {
    Experiment.findAsync({})
        .then(function (experiments) {
            res.status(200).json(experiments);
        })
        .catch(function (err) {
            console.log('err', err);
        })
};
