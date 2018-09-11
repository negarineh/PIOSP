
//load the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//define the schema for our activity model
var Schema = mongoose.Schema;

/**
 * define the schema for our activity model 
 * @param  {{type:String}} email
 * @param  {{type:String}} activityType
 * @param  {{type:Number}} Id
 * @param  {{type:Date}} timeOfActivity
 */

var ActivitySchema = new Schema({
    email: { type: String },
    activityType: {type: String},
    Id:{type: Number},
    timeOfActivity: {type: Date}
});

ActivitySchema
.virtual('_Id')
.get(function() {
    return this.Id;
});

ActivitySchema
.virtual('_email')
.get(function() {
    return this.email;
});

ActivitySchema
.virtual('_timeLoggedIn')
.get(function() {
    return this.timeLoggedIn;
});

ActivitySchema
.virtual('_timeLoggedOut')
.get(function() {
    return this.timeLoggedOut;
});

ActivitySchema
.virtual('_activityType')
.get(function() {
    return this.activityType;
});

ActivitySchema.virtual('info').get(function(){
    return this.Id + ', ' + this.email + ', ' + this.activityType + ', ' + this.timeLoggedIn + ', ' + this.timeLoggedOut;
});

ActivitySchema.virtual('url').get(function(){
    return '/activity/info' + this._id;
});

//methods ======================

module.exports = mongoose.model('activity', ActivitySchema);