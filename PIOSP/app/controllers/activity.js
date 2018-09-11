/*eslint no-undef: "error"*/
/*eslint-env node*/

// /*eslint no-undef-init: "error"*/
// /*eslint-env es6*/

/*eslint no-console: "off"*/

var dateFormat = require('dateformat');

var Admin = require('../models/admin');
var Activity = require('../models/activity');

/**
 * it records activity like insert, delete, update,.etc for each user in collection 
 * 
 * @param  {number} id received admin id
 * @param  {string} activityType type of activity like insert, update,.etc
 * @returns  {object} callback
 * 
 */

module.exports.insertActivity = function(id, activityType, callback){

    var activity = new Activity();
    var day = dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");

    Admin.findOne({_id: id}, function(err, user){
       
        activity.email = user.mail;    
        activity.activityType = activities(activityType);
        activity.timeOfActivity = day ;
        activity.Id = id ;
        activity.save(callback);
    });
};

/**
 * find which activity by code
 * 
 * @param  {number} code id that received in insertActivity function
 * @function  activities
 */

function activities(code) {
    if (code === 1)
        return 'Signup';
    if (code === 2)
        return 'Login';
    if (code === 3)
        return 'Delete';
    if (code === 4)
        return 'Update';
    if (code === 5)
        return 'Count';
    if (code === 6)
        return 'Logout';
}

/**
 * it returns date of activity by including time
 * 
 * @param  {date} date dat of activity
 * @param  {object} callback
 * @returns {objcet} callback
 */

module.exports.reportTime = function(date, callback) {

    Activity.find({timeOfActivity: date}, callback);
};

/**
 * it returns activity by special range(pagination)
 * 
 * @param  {string} emails
 * @param  {number} limit
 * @param  {number} size
 * @param  {object} callback
 * @returns  {object} 
 */

module.exports.reportActivity = function(emails, limit, size, callback) {
    
    Activity.find({email: emails})
    .sort({_id: -1})
    .limit(limit)
    .skip(size)
    .exec(callback);
};

/**
 * it reports the admin of activity base on email 
 * 
 * @param  {string} email received admin email
 * @returns  {object} callback
 * 
 */

module.exports.reportAdminActivity = function(emails, callback){

    Activity.find({email: emails}, callback);
};

/**
 * it reports overal number of activity for each admin
 * 
 * @param  {string} email received admin email
 * @returns  {object} callback
 * 
 */

module.exports.reportCountAdmin = function(emails, callback) {

    Activity.count({email:emails}, callback);
};

module.exports.reportActivityTypeCount = function(activityTypes, callback) {

    Activity.count({activityType: activityTypes}, callback);
};

module.exports.reportEmailActivity = function(emails, activityTypes, callback){

    Activity.find({email: emails, activityType: activityTypes}, callback);
};

module.exports.reportEmailTime = function(emails, date, callback){

    Activity.find({email: emails, timeOfActivity: date}, callback);
};

module.exports.reportDateActivity = function(date, activityTypes, callback){
    
    Activity.find({timeOfActivity: date, activityType: activityTypes}, callback);
};