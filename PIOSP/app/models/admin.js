
//load the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//define the schema for our admin model
var Schema = mongoose.Schema;

/**
 * define the schema for our admin model
 * @param  {Number} id
 * @param  {String} name
 * @param  {String} mail
 * @param  {String} password
 * @param  {String} status
 * @param  {Date} created_date
 * @param  {Date} updated_date
 * @param  {String} active_hash
 * @param  {Number} role_id
 * @param  {Boolean} confirmed
 * @param  {String} resetPasswordToken
 * @param  {Date} resetPasswordExpires
 */
var AdminSchema = new Schema({
	_id:{ type: Number, default: 1 },
	name: String,
	mail: String,
	password: String,
	status: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	role_id: { type: Number, default: 2 },
	confirmed: {type: Boolean, default: false},
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

AdminSchema
.virtual('_name')
.get(function () {
    return this.name;
});

AdminSchema
.virtual('_mail')
.get(function() {
    return this.email;
});

AdminSchema
.virtual('_password')
.get(function() {
    return this.password;
});

AdminSchema
.virtual('_role')
.get(function() {
    return this.role;
});

AdminSchema.virtual('info').get(function(){
    return this.name + ', ' + this.mail + ', ' + this.role;
});

AdminSchema.virtual('url').get(function(){
    return '/admin/info' + this._id;
});


module.exports = mongoose.model('admin', AdminSchema);