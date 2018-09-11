
// module.exports = {

    // 'url' : 'mongodb://127.1.1.0/SurveyResult'

    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var connection = mongoose.connection.openUri('mongodb://127.1.1.0/SurveyResult'); // or you can use => var connection = mongoose.connect('mongodb://127.1.1.0/SurveyResult',{useMongoClient: true});
    module.exports = connection;
     
     //Please replace your host file Here : 127.1.1.0 , Express is Collection Name (Database Name)
// };