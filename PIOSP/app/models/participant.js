
//load the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//define the schema for our participant model
var Schema = mongoose.Schema;

/**
 * define the schema for our participant model
 * @param  {{type:String}} mail
 * @param  {{type:Number}} experience
 * @param  {{type:String}} description
 * @param  {{type:Number}} _id
 * @param  {{type:String}} status
 * @param  {{type:Date}} created_date
 * @param  {{type:String}} active_hash
 * @param  {{type:Boolean}} confirmed
 * @param  {{type:String}} participation
 */
var ParticipantSchema = new Schema({
    mail: { type: String },
    experience: { type: Number },
    description: { type: String },
    _id: { type: Number, default: 1 },
    status: { type: String },
    created_date: Date,
    active_hash: String,
    confirmed: { type: Boolean, default: false },
    participation: { type: String}
});

ParticipantSchema
    .virtual('_mail')
    .get(function() {
        return this.email;
    });

ParticipantSchema
    .virtual('_experience')
    .get(function() {
        return this.experience;
    });

ParticipantSchema
    .virtual('_description')
    .get(function() {
        return this.description;
    });

ParticipantSchema
    .virtual('_name')
    .get(function() {
        return this.alias;
    });

ParticipantSchema.virtual('info').get(function() {
    return this.experience + ', ' + this.description;
});

ParticipantSchema.virtual('url').get(function() {
    return '/participant/info' + this._id;
});

//methods ======================

module.exports = mongoose.model('participant', ParticipantSchema);