const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

// middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', multer, userCtrl.updateUser);  
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;