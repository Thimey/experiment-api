var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComponentSchema = new Schema({
    _experiment: {
        type: Schema.Types.ObjectId,
        ref: 'experiment'
    },
    family: {
        type: String,
        required: true
    },
    _data: {
        type: Schema.Types.ObjectId,
        refPath: 'family'
    }

});
