
var PollinatorInfo = require('../models/pollinatorInfo');
var Admin = require('../controllers/admin');

var constant = require('../../config/constants');

var numbers;

  function updatePhoto(id, number1, callback){
    PollinatorInfo.findOneAndUpdate({_id : id}, {numberShown: number1}, callback);
 }

/**
 * it receives number that we create globally and base on the number will
 * fetch 15 photos from data base and store names in an array for send to the front end
 * through router
 * 
 * @param  {number} num received number of photo
 * @returns  {object} callback
 * 
 */

module.exports.renderPhoto = function( num, callback) {

        // here we are storing number that recieving from hidden field in router
        // first participant should click on activation url and after that counter will be 15 for first time
        // before that it's undefined
        var counter = Admin.photoCounter(numbers);        

        PollinatorInfo.find().where('_id').gt(counter-15).lt(counter+1).exec(function(err, pollinator) {

        for (var i = counter-15; i < counter; i++){
 
            try {
            // find and update numberShown photo
                 updatePhoto(pollinator[i]._id, pollinator[i].numberShown+1, function(err){
                    if (err)
                    // console.log(err);   
                    throw (err);              
                  });
            } catch (ex){
                console.error(ex);
            }
    }  

    // pushing photos with path in to array to send to router and render
    var photoNames = [];
    for (var j1 = 0; j1 < 15; j1++)
    photoNames[j1] = constant.images + pollinator[counter-15+j1].photoId;
 
    callback(photoNames);
        return photoNames;
});
};

/**
 * it saves name of photos by category including the number that photo have shown( we are using for fair rendering),
 * id of photo into the database
 * 
 * @param  {string} photoNames received name of photos
 * @returns  {object} callback
 * 
 */

module.exports.savePhoto = function (photoNames) {
    
        for (var i = 0; i<photoNames.length; i++){
    
        var pollinator = new PollinatorInfo();  

        // set the photo's local credentials photo
        pollinator.photoId = photoNames[i];
        pollinator.numberShown = 0 ;
        pollinator.category = findCategory(photoNames[i]);
        pollinator._id = i+1;
        pollinator.save();
    }
        function findCategory(photoNames) {
            if (photoNames.indexOf('Bee_') > -1)
               return 'Bees';
            if (photoNames.indexOf('Wasp') > -1)
               return 'Wasps';
            if (photoNames.indexOf('Beetle') > -1)
               return 'Beetles';
            if (photoNames.indexOf('Fly') > -1)
               return 'Flies';
            if ((photoNames.indexOf('Butter-Moth') > -1)||(photoNames.indexOf('Butter') > -1))
               return 'Moths';
            
        }
    };
    
  function  photoCounters (number){
      numbers = number;
        return numbers;
    }

module.exports.photoCounter = photoCounters;

/**
 * it returns a photo object by receiving a photoname parameter
 * 
 * @param  {string} photoName received participant email
 * @returns  {object} callback
 * 
 */

module.exports.getByName = function(photoName, callback){
    PollinatorInfo.findOne({photoId: photoName}, callback);
    
 };

/**
 * it updates a photo record by receiving a photoname parameter
 * 
 * @param  {string} photoName received pollinators photo name
 * @param  {string} categories received pollinators categories 
 * @param  {number} numberShow received number for how many times photo shown
 * @returns  {object} callback
 * 
 */

module.exports.updatePollinatorInfo = function(photoName, categories, numberShow, callback){
    var query = {photoId: photoName};
    var update = {photoId: photoName, category: categories, numberShown: numberShow};
    PollinatorInfo.findOneAndUpdate(query, update, callback);

};

/**
 * it checks pollinator table for filled or not filled
 * 
 * @param  {string} photoName received participant email
 * @returns  {object} callback
 * 
 */

module.exports.checkFillTable = function(callback){
    PollinatorInfo.find({}, callback);
};
