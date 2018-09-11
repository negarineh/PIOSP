
//load the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//define the schema for our pollinator answers model
var Schema = mongoose.Schema;

/**
 * define the schema for our pollinator answers model
 * @param  {{type:String}} Id
 * @param  {{type:String}} answer
 * @param  {{type:String}} photo
 * @param  {{type:String}} description
 * @param  {{type:String}} category
 */
var SurveyAnswersSchema = new Schema({
    Id: {type: String},
    answer: { type: String},
    photo: {type: String},
    description: {type: String},
    category: { type: String, enum: ['Bee', 'Beetle', 'Fly', 'Moth/Butterfly', 'Wasp' ] },
});

SurveyAnswersSchema
.virtual('_photoId')
.get(function () {
    return this.photoId;
});

SurveyAnswersSchema
.virtual('_numberShown')
.get(function() {
    return this.numberShown;
});

SurveyAnswersSchema
.virtual('_category')
.get(function() {
    return this.category;
});

SurveyAnswersSchema.virtual('info').get(function(){
    return this.photoId + ', ' + this.numberShown + ', ' + this.category;
});

SurveyAnswersSchema.virtual('url').get(function(){
    return '/pollinator/info' + this._id;
});

//methods ======================

module.exports = mongoose.model('surveyanswers', SurveyAnswersSchema);