var express = require('express');
var router = express.Router();
const passport = require("../config/passport");

const {signUp, getUsers, deleteUser, verifyMail, signIn, signOut, verifyToken} = require('../Controllers/userController')

router.post('/signup', signUp);
router.post('/signin', signIn)
router.get('/', getUsers);
router.get('/verify/:code', verifyMail)
router.get('/token' , passport.authenticate('jwt', {session:false}), verifyToken);
router.patch('/:id', signOut)
router.delete('/:id', deleteUser)

module.exports = router;