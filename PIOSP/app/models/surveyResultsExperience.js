
//load the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//define the schema for our participant model
var Schema = mongoose.Schema;

/**
 * define the schema for our participant model
 * @param  {{type:String}} _id
 * @param  {{type:Number}} experience
 * @param  {{type:String}} description
 * @param  {{type:Date}} created_date
 * @param  {{type:Date}} updated_date
 * @param  {{type:String}} participation
 */
var SurveyResultsExperienceSchema = new Schema({
    _id: {type: String},
    experience: { type: Number },
    description: { type: String },
    created_date: Date,
    updated_date: Date,
    participation: { type: String}
});

SurveyResultsExperienceSchema
    .virtual('_experience')
    .get(function() {
        return this.experience;
    });

SurveyResultsExperienceSchema
    .virtual('_description')
    .get(function() {
        return this.description;
    });

SurveyResultsExperienceSchema.virtual('info').get(function() {
    return this.experience + ', ' + this.description;
});

SurveyResultsExperienceSchema.virtual('url').get(function() {
    return '/surveyresultsexperience/info' + this._id;
});

//methods ======================

module.exports = mongoose.model('surveyresultsexperience', SurveyResultsExperienceSchema);