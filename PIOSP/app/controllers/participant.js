var dateFormat = require('dateformat');
var bcrypt = require('bcrypt-nodejs');

var Participant = require('../models/participant');

/**
 * it creates an participnt record by receiving email, username and creating date, 
 * active code as hash code by bcrypt library inside function
 * 
 * @param  {string} email1 received admin email
 * @param  {string} username1 received admin username
 * @returns  {object} callback
 * 
 */

module.exports.createUser = function(email1, username1, callback) {

    Participant.find().sort([
        ['_id', 'descending']
    ]).limit(1).exec(function (err, userdata) {

        // if there is no user with that email
        // create the user
        var user = new Participant();

        var day = dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");

        var active_code = bcrypt.hashSync(Math.floor((Math.random() * 99999999) * 54), null, null);

        if (userdata[0] === undefined) {
            // set the user's local credentials

            user.mail = email1;
            user.created_date = day;
            user.status = 'inactive'; //inactive for email actiavators
            user.active_hash = active_code;
            user._id = 1;

        } else if (userdata) {
            // set the user's local credentials

            user.mail = email1;
            user.created_date = day;
            user.status = 'inactive'; //inactive for email actiavators
            user.active_hash = active_code;
            user._id = userdata[0]._id + 1;
        }

        user.save(callback); 
        var email = require('../../lib/email1.js');
        email.activate_email(username1, user.mail, user.active_hash);
    });
};

/**
 * it finds participant by receiving an email
 * 
 * @param  {string} email received participant email
 * @returns  {object} callback
 * 
 */

module.exports.getUserByUsername = function(email, callback) {
    var query = { mail: email };
    Participant.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
    Participant.findById(id, callback);
};

/**
 * it finds participant by receiving an email and active hash code as parameters
 * 
 * @param  {string} sent_email received participant email
 * @param  {string} sent_activelink received participant active hash code
 * @returns  {object} callback
 * 
 */

module.exports.getUserByActiveCodes = function(sent_email, sent_activelink, callback) {
    var query = { mail: sent_email, active_hash: sent_activelink };
    // console.log(query);
    Participant.findOne(query, callback);
};

/**
 * it finds participant by receiving an email as parameter
 * and update status from inActive to active
 * 
 * @param  {string} sent_email received participant email
 * @returns  {object} callback
 * 
 */

module.exports.getConfirmed = function(sent_email, callback) {
    var query = { mail: sent_email };

    Participant.findOneAndUpdate(query, { status: 'active' }, callback);
};


/**
 * it calculates number of participant
 * 
 * @returns  {object} callback
 * 
 */

module.exports.participantCounter = function(callback){
    Participant.count({}, callback);

};

module.exports.removeParticipant = function(email, callback){
    var query = { mail: email };
    Participant.remove(query, callback);

};

module.exports.updateParticipant = function(emails, experiences, descriptions, participations, callback){
    var query = {email: emails};
    var update = {experience: experiences, description: descriptions, participation: participations};
    Participant.findOneAndUpdate(query, update, callback);

};