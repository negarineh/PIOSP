
var SurveyResultsExperience = require('../models/surveyResultsExperience');

/**
 * it creates records for survey experience results by receiving 
 * participant id, experience, descripitons,and participation parameters
 * 
 * @param  {number} id received participant id
 * @param  {string} experience received experience
 * @param  {string} descriptions received descriptions
 * @param  {string} participation received participation
 * @returns  {object} callback
 * 
 */

module.exports.saveExperienceResults = function(id, experience, descripitons, participation){
    
        var surveyResultsExperience = new SurveyResultsExperience();

        var day = new Date();
        surveyResultsExperience._id = id;
        surveyResultsExperience.experience = experience;
        surveyResultsExperience.description = descripitons;
        surveyResultsExperience.participation = participation;
        surveyResultsExperience.created_date = day;

        surveyResultsExperience.save();

};

/**
 * it returns surveyResultsexperience collection
 * 
 * @returns  {object} callback
 * 
 */

module.exports.reportExperienceAnswers = function (callback) {

    SurveyResultsExperience.find({}, callback);
};

