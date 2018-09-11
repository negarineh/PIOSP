/*eslint no-undef: "error"*/
/*eslint-env node*/

var SurveyResults = require('../models/surveyResults');

/**
 * it creates records for survey results by receiving answers, descriptions, name of photo ,and id of participant 
 * 
 * @param  {string} options received answers
 * @param  {string} descriptions received descriptions
 * @param  {string} photo received name of photos
 * @param  {number} id received participant id
 * @returns  {object} callback
 * 
 */

module.exports.saveResults = function(options, descripitons, photo, id){

        var surveyResults = new SurveyResults();

        surveyResults.answer = options;
        surveyResults.description = descripitons;
        surveyResults.photo = photo.slice(6, photo.length-4);
        surveyResults.Id = id;
        surveyResults.category = findCategory(photo, options);

        surveyResults.save(); 

    function findCategory(photoNames, options) {
        if (photoNames.indexOf('Bee_') > -1)
        return 'Bee';
        if (photoNames.indexOf('Wasp') > -1)
        return 'Wasp';
        if (photoNames.indexOf('Beetle') > -1)
        return 'Beetle';
        if (photoNames.indexOf('Fly') > -1)
        return 'Fly';
        if ((photoNames.indexOf('Butter-Moth') > -1)||(photoNames.indexOf('butterfly') > -1))
        return 'Moth/Butterfly';
        if (options.indexOf("Don't know") > -1)
        return "Don't know";
    }
};

/**
 * it returns all answers in surveyResults collection
 * 
 * @returns  {object} callback
 * 
 */

module.exports.reportAnswers = function (callback) {

    SurveyResults.find({}, callback);
};

/**
 * it receives answers parameter and also limit number and size number from front end and 
 * base on that will show just number of results (pagination)
 * 
 * @param  {answers} answers received selected answer
 * @param  {number} limit received limitation number 
 * @param  {number} size received number for size of answers
 * @returns  {object} callback
 * 
 */

module.exports.reportAnswersCategory = function (answers, limit, size, callback) {

    SurveyResults.find({answer: answers})
    .sort({ _id: -1 })
    .limit(limit)
    .skip(size)      
    .exec(callback);
};

module.exports.reportOnAnswersCategory = function (answers, callback) {

    SurveyResults.find({answer: answers}, callback);
};

/**
 * it receives answer parameter and will calculate number of this answer
 * 
 * @param  {string} answer received answer parameter
 * @returns  {object} callback
 * 
 */

module.exports.reportAnswersCategoryCount = function (answers, callback) {

    SurveyResults.count({answer: answers}, callback);
};

/**
 * it receives phot name parameter and also limit number and size number from front end and 
 * base on that will show just number of results (pagination)
 * 
 * @param  {answers} photo received selected photo name
 * @param  {number} limit received limitation number 
 * @param  {number} size received number for size of answers
 * @returns  {object} callback
 * 
 */

module.exports.reportAnswersPhotoId = function (photos, limit, size, callback) {

    SurveyResults.find({photo: photos})
    .sort({ _id: -1 })
    .limit(limit)
    .skip(size)      
    .exec(callback);
};

module.exports.reportAnswersPhotoIdCount = function (photos, callback) {

    SurveyResults.count({photo: photos}, callback);
};

/**
 * it calculates the number of correct answers base on category
 * 
 * @returns  {object} callback
 * 
 */

module.exports.equal = function (callback){

    SurveyResults.aggregate([{
        $group: {
            _id: "$category",
            "count": { $sum: 1 }, // simply count all questions per category
            "correct": {
                $sum: { // and sum up the correct ones in a field called "correct"
                    $cond: [ // ...where "correct ones" means
                        { $eq: [ "$category", "$answer" ] }, // that "category" needs to match "answer"
                        1,
                        0
                    ]
                }
            }
        }
    }, {
        $project: { // this is just to effectively rename the "_id" field into "category" - may or may not be needed
            _id: 0,
            "category": "$_id",
            "count": "$count",
            "correct": "$correct"
        }
    }]).exec(callback);
};

/**
 * it calculates the number of correct and incorrect answers base on category
 * 
 * @returns  {object} callback
 * 
 */

module.exports.notEqual = function (callback){
    SurveyResults.aggregate([{
        $group: {
            _id: "$category",
            "count": { $sum: 1 }, // simply count all questions per category
            "inCorrect": {
                $sum: { // and sum up the correct ones in a field called "correct"
                    $cond: [ // ...where "correct ones" means
                        { $ne: [ "$category", "$answer" ] }, // that "category" needs to match "answer"
                        1,
                        0
                    ]
                }
            },
            "correct": {
                $sum: { // and sum up the correct ones in a field called "InCorrect"
                    $cond: [ // ...where "correct ones" means
                        { $eq: [ "$category", "$answer" ] }, // that "category" needs to match "answer"
                        1,
                        0
                    ]
                }
            }
        }
    }, {
        $project: { // this is just to effectively rename the "_id" field into "category" - may or may not be needed
            _id: 0,
            "category": "$_id",
            "count": "$count",
            "correct": "$correct",
            "inCorrect": "$inCorrect",
        }
    }]).exec(callback);
};

module.exports.totalCorrectAnswers = function (callback){
    SurveyResults.aggregate([{
        $group: {
            _id: "answers",
             "count": { $sum: 1 }, // simply count all questions per category
            "correct": {
                $sum: { // and sum up the correct ones in a field called "correct"
                    $cond: [ // ...where "correct ones" means
                        { $eq: [ "$category", "$answer" ] }, // that "category" needs to match "answer"
                        1,
                        0
                    ]
                }
            },
            "inCorrect": {
                $sum: { // and sum up the correct ones in a field called "correct"
                    $cond: [ // ...where "correct ones" means
                        { $ne: [ "$category", "$answer" ] }, // that "category" needs to match "answer"
                        1,
                        0
                    ]
                }
            },
            
        }
    }, {
        $project: { // this is just to effectively rename the "_id" field into "category" - may or may not be needed
            _id: 0,
            "category": "$_id",
            "correct": "$correct",
            "inCorrect": "$inCorrect"
        }
    }]).exec(callback);
};

module.exports.surveyResultsUpdate = function(callback){

    SurveyResults.find({}, callback);
};

