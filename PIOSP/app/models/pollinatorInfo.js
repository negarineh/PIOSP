
//load the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//define the schema for our pollinator model
var Schema = mongoose.Schema;

var PollinatorSchema = new Schema({
    photoId: { type: String },
    numberShown: { type: Number },
    category: { type: String, enum: ['Bees', 'Beetles', 'Flies', 'Moths', 'Wasps', ] },
    _id: {type: Number}
});

PollinatorSchema
    .virtual('_photoId')
    .get(function() {
        return this.photoId;
    });

PollinatorSchema
    .virtual('_numberShown')
    .get(function() {
        return this.numberShown;
    });

PollinatorSchema
    .virtual('_category')
    .get(function() {
        return this.category;
    });

PollinatorSchema.virtual('info').get(function() {
    return this.photoId + ', ' + this.numberShown + ', ' + this.category;
});

//methods ======================

module.exports = mongoose.model('pollinators', PollinatorSchema);