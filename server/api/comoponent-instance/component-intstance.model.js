var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComponentInstanceSchema = new Schema({
    _experiment: {
        type: Schema.Types.ObjectId,
        ref: 'Experiment'
    },
    _component: {
        type: Schema.Types.ObjectId,
        ref: 'Component'
    },
    _componentData: [{
        type: Schema.Types.ObjectId,
        ref: 'ComponentData'
    }]

}, {timestamps: true});

module.exports = mongoose.model('ComponentInstance', ComponentInstanceSchema);
