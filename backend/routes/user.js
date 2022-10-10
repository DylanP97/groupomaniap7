const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

// middleware
const auth = require('../middleware/auth');
const {checkUser, requireAuth} = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get("/logout", userCtrl.logout);

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', checkUser, multer, userCtrl.updateUser);  
router.delete('/:id', checkUser, userCtrl.deleteUser);

module.exports = router;