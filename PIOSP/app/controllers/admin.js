
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

var Admin = require('../models/admin');
var Activity = require('../models/activity');
var PollinatorInfo = require('../controllers/pollinatorInfo');

var constant = require('../../config/constants');

var shuffle = require('shuffle-array');
var fs = require('fs');

/**
 * it creates an admin record by receiving email, username, password and creating id, date, active code inside
 * Also, it saves password as hash code by bcrypt library
 * 
 * @param  {string} email1 received admin email
 * @param  {string} username1 received admin username
 * @param  {string} password1 received admin password
 * @returns  {object} callback
 * 
 */

module.exports.createUser = function(email1, username1, password1, callback) {

    Admin.find().sort([
        ['_id', 'descending']
    ]).limit(1).exec(function (err, userdata) {

        // if there is no user with that email
        // create the user
        var user = new Admin();
        var activity = new Activity();

        var day = dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");

        var active_code = bcrypt.hashSync(Math.floor((Math.random() * 99999999) * 54), null, null);

        if (userdata[0] === undefined) {
            // set the user's local credentials

            user.mail = email1;
            user.password = bcrypt.hashSync(password1, bcrypt.genSaltSync(8), null);
            user.name = username1;
            user.created_date = day;
            user.updated_date = day;
            user.status = 'inactive'; //inactive for email actiavators
            user.active_hash = active_code;
            user._id = 1;
            activity.email = email1;
            activity.Id = 1;
            activity.timeOfActivity = day;
            activity.email = email1;
            activity.activityType = 'Sign Up';

        } else if (userdata) {
            // set the user's local credentials

            user.mail = email1;
            user.password = bcrypt.hashSync(password1, bcrypt.genSaltSync(8), null);            
            user.name = username1;
            user.created_date = day;
            user.updated_date = day;
            user.status = 'inactive'; //active for email actiavators
            user.active_hash = active_code;
            user._id = userdata[0]._id + 1;
            activity.email = email1;            
            activity.Id = userdata[0]._id + 1;
            activity.timeOfActivity = day;
            activity.email = email1;
            activity.activityType = 'Sign Up';
        }

        user.save(callback);
        activity.save(callback);

        var email = require('../../lib/email.js');
        email.activate_email(user.name, user.mail, user.active_hash);
    });
};

/**
 * it returns admin by receiving an email as an input parameter
 * 
 * @param  {string} email1 received admin email
 * @returns  {object} callback
 * 
 */

module.exports.getUserByUsername = function(email, callback) {
    var query = { mail: email };
    Admin.findOne(query, callback);
};

module.exports.getUserByUsernamePass = function(email, callback) {
    var query = { mail: email };
    Admin.findOne(query, callback);
};

/**
 * it returns admin by receiving an id as an input parameter
 * 
 * @param  {number} id received admin id
 * @returns  {object} callback
 * 
 */

module.exports.getUserById = function(id, callback) {
    Admin.findById(id, callback);
};

/**
 * it returns admin by receiving an email and active hash code as an input parameter
 * 
 * @param  {string} sent_email received admin email
 * @param  {string} sent_activelink received active hash
 * @returns  {object} callback
 * 
 */

module.exports.getUserByActiveCode = function(sent_email, sent_activelink, callback) {
    var query = { mail: sent_email, active_hash: sent_activelink };
    Admin.findOne(query, callback);
};

/**
 * it updates admin record by receiving an email and change status to active
 * 
 * @param  {string} sent_email received admin email
 * @returns  {object} callback
 * 
 */

module.exports.getConfirmed = function(sent_email, callback) {
    var query = { mail: sent_email };

    Admin.findOneAndUpdate(query, { status: 'active' }, callback);
};

/**
 * This fills the pollinator collection in database.
 * first read the name of all photos from a directory that contains name of photos and then shuffle 
 * by 'shuffle' package and then save in collection
 * last, read name of all photos 15 by 15 to send to front end through router
 * 
 * @returns  {object} photo names
 * 
 */

module.exports.fillPollinatorTable = function() {

    var photoNames = fs.readdirSync(constant.current_working_directory + constant.image_imageDir);
    
        shuffle(photoNames);
    
        PollinatorInfo.savePhoto(photoNames);
        
        return photoNames;
    };

module.exports.photoCounter = function(number){
    // console.log(number+'admin');
    var numbers = number;
      return numbers;
  };

  /**
 * it removes admin record by receiving an id
 * 
 * @param  {number} id received admin id
 * @returns  {object} callback
 * 
 */

module.exports.removeadmin = function(id, callback){
    var query = { _id: id };
    Admin.remove(query, callback);
};

module.exports.getUserByNameEmail = function(emailSearch, callback){
    var query = {mail: emailSearch};//, password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    Admin.findOne(query, callback);

};

/**
 * it updates admin record by receiving an email and change the name and the email by  
 * the name and email that received as an parameter
 * 
 * @param  {string} email received admin email
 * @param  {string} name received admin name
 * @returns  {object} callback
 * 
 */

module.exports.updateAdmin = function(email, name, callback){
    var query = {mail: email};
    var update = {mail: email, name: name};//, password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    Admin.findOneAndUpdate(query, update, callback);

};

module.exports.forgotPassword = function(email, resetToken, host, callback){
    var query = {mail: email};
    var update = {resetPasswordToken : resetToken, resetPasswordExpires :  Date.now() + 3600000  };// 1 hour

    Admin.findOneAndUpdate(query, update, callback);
    sendEmail1(email, resetToken, host);
};

module.exports.updatePassword = function(token, password, callback){
    var query = { resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }};
    var update = {password : bcrypt.hashSync(password, bcrypt.genSaltSync(8), null), resetPasswordToken : undefined, resetPasswordExpires : undefined};

    Admin.findOne({resetPasswordToken: token}, function(err, user){
    Admin.findOneAndUpdate(query, update, callback);
    sendEmail2(user.mail);
    });
};

function sendEmail1(email, resetToken, host){

    Admin.findOne({mail: email}, function(err, user){

    var message = {
        subject: 'Reset Password',
        text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://'}${host}/forgotPassword/${resetToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

        var mail = require('../../lib/mail.js');
        mail.activate_email(user.name, user.mail, resetToken, message);
    });
}

function sendEmail2(email){

    Admin.findOne({mail: email}, function(err, user){
      // If password change saved successfully, alert user via email
      var message = {
        subject: 'Password Changed',
        text: 'You are receiving this email because you changed your password. \n\n' +
          'If you did not request this change, please contact us immediately.'
      };

        var mail = require('../../lib/mail.js');
        mail.activate_email(user.name, user.mail, null, message);
    });
}

/**
 * it returns names of all admins
 * 
 * @returns  {object} callback
 * 
 */

module.exports.getAllAdmins = function( size, start, callback) {
    
    Admin.find({})       
    .exec(callback);
};

