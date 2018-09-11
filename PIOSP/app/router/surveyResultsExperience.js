
var surveyResultsExperience = require('../controllers/surveyResultsExperience');

var cors = require('cors');

//expose this function to our app using module.exports
module.exports = function(app) {

app.use(cors());

    app.get('/saveExperience',  function(req, res) {
            res.send('surveyResultsExperience');
    });

    /**
     * it creates records for survey experience results by receiving 
     * participant id, experience, descripitons,and participation parameters
     * 
     * @param  {number} id received participant id
     * @param  {string} experience received experience
     * @param  {string} descriptions received descriptions
     * @param  {string} participation received participation
     * @returns  {object} record of experience result for last page of survey result answers
     * 
     */
    app.post('/saveExperience', function(req, res){

        var id = req.body.id,
            experience = req.body.experience,
            descriptions = req.body.description,
            participation = req.body.participation;

        surveyResultsExperience.saveExperienceResults(id, experience, descriptions, participation);
           
        res.status(200);
            });

    app.get('/reportExperienceAnswers', function(req, res, next){
    
        surveyResultsExperience.reportExperienceAnswers(function(err, answers){
                if (err)
                    return next(err);
            res.send(answers);
            });
    });

    app.get('/answersOneWeek', function(req, res, next){

        surveyResultsExperience.answersOneWeek(function(err, answer){

            if (err)
                return next(err);
            var day = new Date();
            console.log(day.toDateString()); // eslint-disable-line no-console
            console.log(day.toDateString().replace("22", "31")); // eslint-disable-line no-console
            console.log(parseInt(day.toDateString().slice(8, 2), 2)); // eslint-disable-line no-console
                res.json(answer); 
        });
    });
};