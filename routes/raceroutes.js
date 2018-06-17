var express = require('express');
var router = express.Router();
var raceController = require('../controllers/racecontroller');
var User = require('../models/user');

// CHECK IF ADMIN OR LOGGGED IN, BEFORE EACH ROUTE

router.get('/', raceController.index);

router.post('/', raceController.race_create_post);

router.put('/:id', raceController.race_update_put);

router.delete('/:id', raceController.race_delete);

router.get('/add', isLoggedIn, isAdmin, raceController.addracepage);

router.get('/:id', raceController.race_detail);

router.get('/name/:name', raceController.race_detail_name);

router.get('/:id/cafes', raceController.race_cafes);

router.get('/:id/users', raceController.race_users);

router.post('/:id', isLoggedIn, isAdmin, raceController.race_update_put);


function isAdmin(req, res, next) {
    User.findById(req.session.passport.user, function (err, response) {
        if (response != null) {
            if (response.admin == true) {
                console.log("This user is admin");
                return next();
            }
            else {
                res.send('You have to be admin to do this action!');
            }
        }
    });
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
}

//export this router to use in our index.js
module.exports = router;