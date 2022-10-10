const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post')

// middleware
const {checkUser, requireAuth} = require('../middleware/auth');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', checkUser, multer, postCtrl.createPost);
router.put('/:id', checkUser, multer, postCtrl.modifyPost);
router.delete('/:id', checkUser, postCtrl.deletePost);
router.patch('/like/:id', postCtrl.likePost);
router.patch('/unlike/:id', postCtrl.unlikePost);
router.patch('/add-comment/:id', checkUser, postCtrl.commentPost);
router.patch('/edit-comment/:id', checkUser, postCtrl.editCommentPost);
router.patch('/delete-comment/:id', checkUser, postCtrl.deleteCommentPost);

module.exports = router;