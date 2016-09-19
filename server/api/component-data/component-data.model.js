var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComponentDataSchema = new Schema({
    _compInstance: {
        type: Schema.Types.ObjectId,
        ref: 'ComponentInstance'
    },
    data: {
        // Need to validate against current data structure in component
    }

}, {timestamps: true});

module.exports = mongoose.model('ComponentData', ComponentDataSchema);
