
var surveyResults = require('../controllers/surveyResults');
var pollinatorInfo = require('../controllers/pollinatorInfo');
var domino = require('domino');

var window = domino.createWindow('<input value = 0 type = hidden name = counter2 />');
var document = window.document;
var input = document.querySelector('input');

var cors = require('cors');

var Set = require("collections/set");
var Map = require("collections/map");

var fs = require('fs');
var Papa = require('papaparse');

/*eslint no-unused-vars:*/
//expose this function to our app using module.exports
module.exports = function(app, passport) {
app.use(cors());
    
    app.get('/save',  function(req, res) {

            pollinatorInfo.renderPhoto({}, function(photonames){
                
                res.send(photonames);
            });
        });

    /**
     * /save <br/>
     * process the signup form
     * 
     * @param  {string} AppSource received participant rating
     * @param  {string} description received participant description for experience in pollination survey
     * @param  {number} id receive participant id
     * @returns  {object} participant experience record
     * 
     */
    app.post('/save', function(req, res){

        var options = req.body.AppSource;
        var descriptions = req.body.description;
        var id = req.body.id;

        pollinatorInfo.renderPhoto({}, function(photonames){

            var photo ;
            if (parseInt(input.value) === 0){
                photo = photonames[parseInt(input.value)];
                }
            if ((parseInt(input.value) < 15) && (parseInt(input.value) != 0)) {
                photo = photonames[parseInt(input.value)];
                }
            if (parseInt(input.value) === 15){
                input.value = 0 ;
                }

                surveyResults.saveResults(options, descriptions, photo, id);
                
                input.value = parseInt(input.value)+1;
               
        res.render('photostest', { sent_email: photonames});
            });
    });
    
    app.get('/reportAnswers', function(req, res, next){

            surveyResults.reportAnswers(function(err, answers){
                if (err)
                    return next(err);
            res.send(answers);
            });
    });

    app.get('/reportAnswersCategory',  function(req, res) {
        res.send('result');
        
    });

    /**
     * it receives answers parameter and also limit number and size number from front end and 
     * base on that will show just number of results (pagination)
     * 
     * @param  {answers} answers received selected answer
     * @param  {number} limit received limitation number 
     * @param  {number} size received number for size of answers
     * @returns  {object} record of selected answers
     * 
     */
    app.post('/reportAnswersCategory', function(req, res, next){
            var answer = req.body.answer;
            var page = req.body.page || 1;
            var size = req.body.size || 5;

            var skip = (parseInt(page, 10) - 1 ) * parseInt(size, 10);

            surveyResults.reportAnswersCategory(answer, size, skip, function(err, answers){
                if (err)
                    return next(err);
            return res.json(answers);
            });
    });

    /**
     * it receives answers parameter and will show just number of results
     * 
     * @param  {answers} answers received selected answer
     * @returns  {object} record of selected answers
     * 
     */
    app.post('/reportOnAnswersCategory', function(req, res, next){
        var answer = req.body.answer;
      
            surveyResults.reportOnAnswersCategory(answer, function(err, answers){
                if (err)
                    return next(err);
            return res.json(answers);
            });
    });

    app.get('/reportOnAnswersCategory', function(req, res){
        return res.json('answers');
    });

    app.get('/reportAnswersCategoryCount', function(req, res){
        return res.json('Counted');
    });

    /**
     * it receives answer parameter and will calculate number of this answer
     * 
     * @param  {string} answer received answer parameter
     * @returns  {object} number of answers base on category
     * 
     */
    app.post('/reportAnswersCategoryCount', function(req, res, next){
        var answer = req.body.answer;

        // try {
        surveyResults.reportAnswersCategoryCount(answer, function(err, number){
            if (err)
                return next(err);
            res.json(number);
        });
    });

    app.get('/reportAnswersPhotoId',  function(req, res) {
        res.send('result');
    });

    /**
     * it receives phot name parameter and also limit number and size number from front end and 
     * base on that will show just number of results (pagination)
     * 
     * @param  {answers} photo received selected photo name
     * @param  {number} limit received limitation number 
     * @param  {number} size received number for size of answers
     * @returns  {object} return photo names bas on seaarch
     * 
     */
    app.post('/reportAnswersPhotoId', function(req, res, next){
            var photoName = req.body.photoName;
            var page = req.body.page || 1;
            var size = req.body.size || 5;
            var skip = (parseInt(page, 10) - 1 ) * parseInt(size, 10);
        
            surveyResults.reportAnswersPhotoId(photoName, size, skip, function(err, answers){
                if (err)
                    return next(err);
            res.send(answers);
            });
    });

    app.get('/reportAnswersPhotoIdCount', function(req, res){
        return res.json('Counted');
    });
    app.post('/reportAnswersPhotoIdCount', function(req, res, next){
        var photoName = req.body.photoName;
    
        surveyResults.reportAnswersPhotoIdCount(photoName, function(err, number){
            if (err)
                return next(err);
            res.json(number);
        });
    });

    /**
     * it calculates the number of correct answers base on category
     * 
     * @returns  {object} record that contains category name and number of answers per each category
     * 
     */
    app.get('/equal', function(req, res, next){

            surveyResults.equal(function(err, answer){
                if (err)
                    return next(err);
                res.json(answer);
            });
    });

    /**
     * it calculates the number of correct and incorrect answers base on category
     * 
     * @returns  {object} record that contains category name and number of answers per each category(incorrect and correct)
     * 
     */
    app.get('/notEqual', function(req, res, next){

            surveyResults.notEqual(function(err, answer){
                if (err)
                    return next(err);
                res.json(answer);
            });
    });

    app.get('/totalCorrectAnswers', function(req, res, next){

        surveyResults.totalCorrectAnswers(function(err, answer){
            if (err)
                return next(err);
                res.json(answer);
        });
    });

    /**
     * it updates same Id for each 15 participant's answers 
     * 
     * @returns  {object} record that update Id field
     * 
     */
    app.get('/surveyResultsUpdate', function(req, res, next){

        surveyResults.surveyResultsUpdate(function(err, answers){
            if (err)
            return next(err);
        
        var num =0;
        var resultsIdSet = new Set();
        answers.forEach(function(answer) {
             resultsIdSet.add(answer.Id);        
        });

        var newResults = answers; 
       
        var user_answer_dict = new Map();

        var counter = 0;
        for (var Id of resultsIdSet){
            num += 1;
            for ( var j in newResults) {
                    if (Id === newResults[j].Id){
                        counter+=1;
                        user_answer_dict.set(counter, newResults[j]);

                        newResults[j]._id = answers[j]._id;
                        newResults[j].Id = num;
                        newResults[j].answer = answers[j].answer;
                        newResults[j].photo = answers[j].photo;
                        newResults[j].description = answers[j].description;
                        newResults[j].category = answers[j].category;
                    }
                }
            }
            res.json(newResults);
        });
    });

};

