
var participant = require('../controllers/participant');
var pollinatorInfo = require('../controllers/pollinatorInfo');

var passport = require('passport');
var url = require('url');

var jwt = require('jsonwebtoken');

var domino = require('domino');
var window = domino.createWindow('<input value = 0 type = hidden name = counter1 />');
var document = window.document;
var input = document.querySelector('input');

// Middleware to require login/auth
var requireAuth = passport.authenticate('jwt', { session: false});
var requireLogin = passport.authenticate('local', { session: false });


//expose this function to our app using module.exports
module.exports = function(app) {

// This is the way by RestAPI
        app.get('/home', requireAuth,  function(req, res, next) {
            res.json('home');

        }); //home

        // Register
        app.get('/signupparticipant',  function(req, res) {
            res.json('signup');
    
        });
    
        // Login
        app.get('/loginparticipant', notLoggedIn, function(req, res) {
            res.json('signup');
        });

        // =========================================================================
        // LOCAL SIGNUP ============================================================
        // =========================================================================
        // we are using named strategies since we have one for login and one for signup
        // by default, if there was no name, it would just be called 'local'

        /**
         * /signupparticipant <br/>
         * process the signup form
         * 
         * @param  {string} email received admin email
         * @param  {string} username received admin username
         * @returns  {object} participant record
         * 
         */
        app.post('/signupparticipant', function (req, res, next) {
            
                        var email = req.body.email;
                        var username1 = req.body.username;
            
                        // Return error if no email provided
                        if (!email) {
                            res.status(422).send({ error: 'You must enter an email address.' });
                        }
            
                        // Return error if full name not provided
                        if (!username1) {
                            res.status(422).send({ error: 'You must enter your name.' });
                        }

                        participant.getUserByUsername(email, function(err, user) {
                            // if there are any errors, return the error
                            if (err)
                                // return (err);
                                return next(err);
            
                            // check to see if theres already a user with that email
                            if (user) {
                                return res.status(422).send({ error: 'That email address is already in use.' });
                            } else {

                                //  create user ==================
                                participant.createUser(email, username1, function(err, user) {
                                    if (err)
                                        return next(err);
                        
                                });
                            
                                return res.json({message : 'Account Created Successfully,Please Check Your Email For Account Confirmation.'});            
                            }
                        });
                    
                    // });
            
                });
        // =========================================================================
        // LOCAL LOGIN =============================================================
        // =========================================================================
        // we are using named strategies since we have one for login and one for signup
        // by default, if there was no name, it would just be called 'local'

        /**
         * /signupparticipant <br/>
         * process the signup form
         * 
         * @param  {string} email received admin email
         * @returns  {object} participant record and created token
         * 
         */
        app.post('/loginparticipant', requireLogin, function (req, res, next){
            
                    var email = req.body.email;
                
                    participant.getUserByUsername(email, function(err, user) {
                        if (err)
                           return next(err);

                        var token = jwt.sign({ _id: user._id }, 'secret');
                        res.cookie('jwt', token);

                    return res.json({token:  token, user: user});
                    });
                });


        // =========================================================================
        // LOGIN Particpant ==================================================
        // =========================================================================
        // here we are checking URL that we sent to participant, if It's a first time it will 
        // go through the first page, if one time attend before it will show can not attend, 
        // if it's not exist it will show first create 

        /**
         * /confirm?:email?:active_link <br/>
         * process the participant login through created unique link by email and active code
         * 
         * @param  {string} email received admin email
         * @param  {string} active_link received admin generated active link
         * @returns  {object} send email and successfully redirect to first page of survey
         * 
         */
        app.get('/confirm?:email?:active_link', function(req, res, next) { // callback with email and password from our form

            var sent_url = url.parse(req.url, true);
            var qdata = sent_url.query, //return '/confirm'
                sent_email = qdata.email,
                sent_activelink = qdata.active_link;
            
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
        
            participant.getUserByActiveCodes(sent_email, sent_activelink, function(err, user) {
                // if there are any errors, return the error before anything else

                if (err)
                    return next(err);
    
                // if no user is found, return the message
                if (!user) {    
                    res.send({message: 'Sorry Your Account Not Exits ,Please Create Account.' });
                }
    
                if (user) {
                    if (user.status === 'active') {
                        res.redirect('http://localhost:3001/inhibitor');
                        
                    }
    
                if ((user) && (user.status === 'inactive')) {
                
                /*eslint no-unused-vars:*/
                    participant.getConfirmed(sent_email, function(err, user) {
                        // if there are any errors, return the error before anything else     
                        if (err)
                            return next(err);
                    });

                        input.value = parseInt(input.value)+15;
                        pollinatorInfo.photoCounter(input.value);

                        var token = jwt.sign({ _id: user._id }, 'secret');

                        res.cookie('jwt', token);
                            res.redirect('http://localhost:3001/LoginPageParticipant');
                        // all is well, return successful user to first page
                        
                    }
                }

            });
        });

        app.get('/participantInfo', function(req, res){
            res.send('participantInfo');
                });

        /**
         * /participantInfo <br/>
         * give the information od admin by receiving email
         * 
         * @param  {string} email received admin email
         * @returns  {object} participant record
         * 
         */
        app.post('/participantInfo', function(req, res, next){
            
                var email = req.body.email;

                participant.getUserByUsername(email, function(err, user){
                    if (err)
                        return next(err);
                    if (user)
                        return res.send({message: 'This user is exists:  '+ user});
                        // do works with with user information
                    if (!user)
                        return res.send({message: 'user is not exists'});
                        //  show proper message
                    });
                });
        
        /**
         * /removeparticipant <br/>
         * remove participant by receiving email 
         * 
         * @param  {string} email received participant email
         * @returns  {object} successfully delete an participant record
         * 
         */
        app.delete('/removeparticipant', function(req, res, next){

            var email = req.body.email;

        participant.getUserByUsername(email, function(err, user){
            if (err)
                return next(err);
            if (!user)
                return res.json('No user with email: '+ email);
            if (user)
            participant.removeParticipant(email, function(err, user) {
                if (err)
                    return next(err);
                res.send({message: 'user ' + email + ' removed'});
            });
        });
        });
    
    /**
     * /counterparticipant <br/>
     * count number of participant
     * 
     * @returns  {object} successfulyy return number of participant
     * 
     */
    app.get('/countparticipant', function(req, res, next){

            participant.participantCounter(function (err, count) {
                if (err)
                    return next(err);
                res.send({message: 'Number of participant: '+ count});
            });
    });

        // process the logout form
        app.get('/logout', requireAuth, function(req, res) {

            req.logout();
            res.clearCookie('jwt');
            res.redirect('/login');

        });

        function notLoggedIn(req, res, next) {
            if (!req.cookies['jwt']) {
                return next();
            }
            res.redirect('/home');
        }
};