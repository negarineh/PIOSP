
var admin = require('../controllers/admin');
var pollinatorInfo = require('../controllers/pollinatorInfo');
var activity = require('../controllers/activity');

var passport = require('passport');

var bcrypt = require('bcrypt-nodejs');

var url = require('url');

var jwt = require('jsonwebtoken');

var domino = require('domino');
var window = domino.createWindow('<input value = 0 type = hidden name = counter1 />');
var document = window.document;
var input = document.querySelector('input');

var crypto = require('crypto');

var requireAuth = passport.authenticate('jwt', { session: false, });

var cors = require('cors');


//expose this function to our app using module.exports
module.exports = function(app) {

    app.use(cors());

    // app.use('/', function(req, res){
    //     // res.json('home');
    //     res.render('home.ejs');
    // });
    
    app.get('/signup',  function(req, res) {
        res.json('sign up');

    });

    // Login
    app.get('/login', notLoggedIn, function(req, res) {

        res.json('login');
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

        /**
         * /signup <br/>
         * process the signup form
         * 
         * @param  {string} email received admin email
         * @param  {string} password received admin password
         * @param  {string} username1 received admin username
         * @returns  {object} admin record
         * 
         */
    app.post('/signup', function (req, res, next) {
        
                    var email = req.body.email;
                    var password = req.body.password;
                    var username1 = req.body.username;

                    if (!email) {
                         return res.status(422).send({ error: 'You must enter an email address.' });
                    }
        
                    // Return error if full name not provided
                    if (!username1) {
                        return res.status(422).send({ error: 'You must enter your name.' });
                    }
        
                    // Return error if no password provided
                    if (!password) {
                        return res.status(422).send({ error: 'You must enter a password.' });
                    }

                    admin.getUserByUsername(email, function(err, user) {
                        // if there are any errors, return the error
                        
                            if (err)
                                return next(err);
                            
                        // check to see if theres already a user with that email
                        if (user) {
                            return res.status(422).send({ error: 'That email address is already in use.' });
                        } else {

                            //  create user ==================
                        
                            admin.createUser(email, username1, password, function(err, user) {
                                if (err)
                                    return next(err);
                            });

                            return res.json('Account Created Successfully,Please Check Your Email For Account Confirmation.');
                        }
                    });
        
            });
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
        /**
         * /login <br/>
         * process the login form
         * 
         * @param  {string} email received admin email
         * @param  {string} password received admin password
         * @returns  {object} admin record created JWT
         * 
         */
    app.post('/login', function (req, res, next){
        
                var email = req.body.email;
                var password = req.body.password;
            
                admin.getUserByUsernamePass(email, function(err, user) {

                    if (err)
                        return next(err);
                    if (!user) 
                        return res.json('User not found');
                
                    if (!bcrypt.compareSync(password, user.password) ) {
                        return res.json('Password is not correct');
                    } 
                    if ((user)&&(bcrypt.compareSync(password, user.password) )){
                        
                    var token = jwt.sign({ _id: user._id }, 'secret');
                    res.cookie('jwt', token);
                
                    activity.insertActivity(user._id, 2, function(err){
                        if (err)
                            return next(err);
                    });

                return res.json({token:  token, user: user});
                    } 
                });
            });


    // =========================================================================
    // LOGIN Particpant ==================================================
    // =========================================================================
    // here we are checking URL that we sent to participant, if It's a first time it will 
    // go through the first page, if one time attend before it will show can not attend, 
    // if it's not exist it will show first create 

        /**
         * /confirming?:email?:active_link <br/>
         * process the participant login through created unique link by email and active code
         * 
         * @param  {string} email received admin email
         * @param  {string} active_link received admin generated active link
         * @returns  {object} send email and successfully create admin account
         * 
         */
    app.get('/confirming?:email?:active_link', function(req, res, next) { // callback with email and password from our form
 
        var sent_url = url.parse(req.url, true),
            qdata = sent_url.query, //return '/confirm'
            sent_email = qdata.email,
            sent_activelink = qdata.active_link;
            
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already 
    
        admin.getUserByActiveCode(sent_email, sent_activelink, function(err, user) {
            // if there are any errors, return the error before anything else

            if (err)
                return next(err);

            // if no user is found, return the message
            if (!user) {
                res.send({message: 'Sorry Your Account Not Exits ,Please Create Account.' });
            }

            if (user) {
                if (user.status === 'active') {
                    res.send({message: 'You tried one time before' });
                }

                if ((user) && (user.status === 'inactive')) {
                
                    admin.getConfirmed(sent_email, function(err, user) {
                        // if there are any errors, return the error before anything else                    
                        if (err)
                            return next(err);
                    });

                    input.value = parseInt(input.value)+15;
                    pollinatorInfo.photoCounter(input.value);

                    // send message as RestAPI
                    res.json({message : 'Your Account Activated , WELCOME ' + user.name +' ' + input.value});
                    // all is well, return successful user
                    
                }
            }

        });

    });

    app.get('/adminInfo', function(req, res){

        return res.send({message: 'This user is exists:  '});
       
    });
 
    /**
     * /adminInfo <br/>
     * give the information of an admin by receiving email
     * 
     * @param  {string} email received admin email
     * @returns  {object} admin record 
     * 
     */
    app.post('/adminInfo', function(req, res, next){

    var email = req.body.email;
    
        admin.getUserByUsername(email, function(err, user){
            if (err)
                return next(err);
            if (user)
                return res.json(user);
                // do works with with user information
            if (!user)
                return res.send('user is not exists');
                //  show proper message
            });
    });

    /**
     * /alladmins <br/>
     * give the information of all admins by receiving page and size from front end for pagination
     * 
     * @param  {string} email received admin email
     * @returns  {object} all admin records
     * 
     */
    app.get('/alladmins', function(req, res, next){

        var page = req.body.page || 1 ;
        var size = req.body.size || 10;
        
        var start = (parseInt(page, 100) - 1) * parseInt(size, 100);

        admin.getAllAdmins(size, start, function(err, user){
            if (err) 
                return next(err);
            if (user)
                return res.json(user);
                // do works with with user information
            if (!user)
                return res.json('user is not exists');
                //  show proper message
            });
        });

        /**
         * /removeadmin/:id <br/>
         * remove an admin by receiving email (for each insert, delete, update and read function
         * we are inserting related activity to the activity collection)
         * 
         * @param  {number} id received admin id
         * @returns  {object} successfully delete an admin record
         * 
         */
        app.delete('/removeadmin/:id', function(req, res, next){
    
        var sent_id = req.params.id;

        admin.getUserById(sent_id, function(err, user){
        activity.insertActivity(sent_id, 3, function(err){
            if (err)
                return next(err);
            if (!user)
                return res.json('No user with ID: ' + sent_id);
            if (user)
                admin.removeadmin(sent_id, function(err, user) {
                    if (err)
                        return next(err);
                    });
            return res.json('User with this ID: ' + sent_id +' deleted' );
            });
        });
    });

    /**
     * /updateadmin <br/>
     * update the information of an admin by receiving emailsearch parameter for query
     * and name and email for updating
     * 
     * @param  {string} email received admin email
     * @returns  {object} successfulyy update an admin record
     * 
     */
    app.put('/updateadmin', function(req, res, next){

        var email =  req.body.email,
            emailSearch = req.body.emailSearch,
            name = req.body.name; 

        admin.getUserByNameEmail(emailSearch, function(err, user){
            if (err)
                return next(err);
            if (!user)
                return res.json('No user with this Email: '+ emailSearch);
            if (user)
                admin.updateAdmin(email, name, function(err, user){
                    if (err)
                        return  next(err);
                    
                        activity.insertActivity(user._id, 4, function(err){
                            if (err)
                                return next(err);
                        });
                    res.json({message: 'User ' + user.name + ' updated'});
                });
        });
        
    });

//= =======================================
// Forgot Password Route
//= =======================================

    app.post('/forgotPassword', function (req, res, next) {

        var email = req.body.email;
        var host = req.headers.host;
    
        admin.getUserByUsername( email, function(err, existingUser) {
        // If user is not found, return error
        if (err || existingUser === null) {
            res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
            return next(err);
        }
    
            // If user is found, generate and save resetToken
    
            // Generate a token with Crypto
        crypto.randomBytes(48, function(err, buffer) {
            var resetToken = buffer.toString('hex');
            if (err) { 
                return next(err); 
            }
    
            admin.forgotPassword(email, resetToken, host, function(err) {
                // If error in saving token, return it
                if (err) { 
                    return next(err); 
                }
    
            return res.status(200).json({ message: 'Please check your email for the link to reset your password.' });
            });
        });
        });
  });
  
  //= =======================================
  // Reset Password Route
  //= =======================================
  app.get('/forgotPassword/:token', function (req, res) {
      res.send('resetpassword');
  });
  app.post('/forgotPassword/:token', function (req, res, next) {
    
    var password = req.body.password;
    admin.updatePassword(req.params.token, password, function(err, resetUser){
        // If query returned no results, token expired or was invalid. Return error.
        if (!resetUser) {
            res.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
        }
  
        if (err) { 
            return next(err); 
        }

        return res.status(200).json({ message: 'Password changed successfully. Please login with your new password.' });
        });
    });

    /**
     * /checkfill <br/>
     * process the fill pollinator table
     * 
     * @returns  {object} admin record created JWT
     * 
     */
    app.get('/checkFill', function(req, res, next) {
              
        pollinatorInfo.checkFillTable(function(err, response) {
            if (err)
                return next(err);
                
                return res.send(response);
        });      
    });
    
    // process the fill pollinator table
    app.get('/fill', function(req, res) {
              
        admin.fillPollinatorTable();
        return res.status(200).json('Filled');        
    });

    function notLoggedIn(req, res, next) {
        if (!req.cookies['jwt']) {
            return next();
        }
        res.redirect('/home');
    }
};