
var activity = require('../controllers/activity');

module.exports = function(app) {

        app.get('/reportTime',  function(req, res){
                res.send('report');
        });
        app.post('/reportTime',  function(req, res, next){
        
                var timeOfActivity = req.body.timeOfActivity;
                activity.reportTime(timeOfActivity, function(err, activities){
                    if (err)
                        return next(err);
                    res.json( {message: activities} );
                });
        });

        app.get('/reportId',  function(req, res){
                res.json('report');
        });
        
        /**
         * /reportId <br/>
         * it returns report activities of admin by receiving an email, 
         * number of page and size for pagination
         * 
         * @param  {string} email received admin email
         * @param  {number} page received page number
         * @param  {number} size received page size
         * @returns  {object} activities
         * 
         */
        app.post('/reportId',  function(req, res, next){
            
                var email = req.body.email,
                    page = req.body.page || 1,
                    size = req.body.size || 5; 
                
                var skip = (parseInt(page, 10) - 1 ) * parseInt(size, 10);

                activity.reportActivity(email, size, skip, function(err, activities){
                        if (err) 
                                return next(err);
                        res.json( activities);
                        });
        });

        app.get('/reportAdminActivity', function(req, res){
                        return res.json('Admin Activities');
                });
        app.post('/reportAdminActivity', function(req, res, next){
                var email = req.body.email;
              
                    activity.reportAdminActivity(email, function(err, activities){
                        if (err)
                            return next(err);
                    return res.json(activities);
                    });
            });
        

        app.get('/reportCountAdmin', function(req, res){
                res.json('Admin activity report');
        });
        
        /**
         * /reportCountAdmin <br/>
         * it returns number of each activity for each adminby receiving email as query parameter
         * 
         * @param  {string} email received admin email
         * @returns  {object} activities
         * 
         */
        app.post('/reportCountAdmin', function(req, res, next){

                var email = req.body.email;
                activity.reportCountAdmin(email, function(err, activities){
                        if (err)
                                return next(err);
                        res.json(activities);
                });
        });

        app.get('/reportActivityCount',  function(req, res){
                res.send('report');
        });
        app.post('/reportActivityCount',  function(req, res, next){
            
                var activityType = req.body.activityType;
                activity.reportActivityTypeCount(activityType, function(err, activities){
                        if (err)
                           return next(err);
                        res.send( {message: activities} );
                        });
        });

        app.get('/reportEmailActivity',  function(req, res){
                res.send('report');
        });
        app.post('/reportEmailActivity',  function(req, res, next){
            
                var email = req.body.email;
                var activityType = req.body.activityType;
                activity.reportEmailActivity(email, activityType,  function(err, activities){
                        if (err)
                           return next(err);
                res.send( {message: activities} );
                });
        }); 

        app.get('/reportEmailTime',  function(req, res){
                res.send('report');
        });
        app.post('/reportEmailTime',  function(req, res, next){
            
                var email = req.body.email;
                var timeOfActivity = req.body.timeOfActivity;
                activity.reportEmailTime(email, timeOfActivity,  function(err, activities){
                        if (err)
                           return next(err);
                res.send( {message: activities} );
                });
        });

        app.get('/reportTimeOfActivity', function(req, res){
                res.send('activity');
        });
        app.post('/reportTimeOfActivity', function(req, res, next){
            
                var timeOfActivity = req.body.timeOfActivity,
                    activityType = req.body.activityType;
                activity.reportDateActivity(timeOfActivity, activityType, function(err, activities){
                        if (err)
                           return next(err);
                res.send( {message: activities}  );
                });
        });

};
