
var pollinatorInfo = require('../controllers/pollinatorInfo');

//expose this function to our app using module.exports
module.exports = function(app) {

    /**
     * /upload <br/>
     * send selected photonames from server to front end 
     * 
     * @returns  {object} successfulyy send name of all photos
     * 
     */
    app.get('/upload', function(req, res) {

            pollinatorInfo.renderPhoto({}, function(photonames){

                res.send(photonames);
            });
    });

    app.get('/photoNumberShown', function(req, res){
        res.send('phototest');
    });

    /**
     * /photoNumberShown <br/>
     * show how many times one photo has shown to participants
     * 
     * @param  {string} photoname received photo name
     * @returns  {object} number of repeated photo
     * 
     */
    app.post('/photoNumberShown', function(req, res, next){

    var photoName = req.body.photoName;

    pollinatorInfo.getByName(photoName, function(err, photo){
        if (err)
            return next(err);
        if (photo)
             res.send( photo.photoId + ' : ' + photo.numberShown);
            // do works with with phhoto information
        if (!photo)
             res.send('photo is not exists');
            //  show proper message
        });
    });

    /**
     * /updatePollinatorInfo <br/>
     * update the information of a pollinator byreceiving photoname, category and number it has shown
     * 
     * @param  {string} photoname received photo name
     * @param  {string} category received category name
     * @param  {number} numbershown received number
     * @returns  {object} successfulyy update a pollinator photo record
     * 
     */
    app.put('/updatePollinatorInfo', function(req, res, next){

        var photoName =  req.body.photoName,
            category = req.body.category,
            numberShown = req.body.numberShown;
        // try {
            pollinatorInfo.updatePollinatorInfo(photoName, category, numberShown, function(err, photo){
            if (err)
                return next(err);
            res.send(photo.photoId + ' is updated');
            });
    });
};