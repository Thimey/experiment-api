var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExperimentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    _components: [{
        type: Schema.Types.ObjectId,
        ref: 'component'
    }]
});

module.exports = mongoose.model('Experiment', ExperimentSchema);
