const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post')

// middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', multer, postCtrl.createPost);
router.put('/:id', multer, postCtrl.modifyPost);  
router.delete('/:id', postCtrl.deletePost);
router.patch('/like-post/:id', postCtrl.likePost);
router.patch('/unlike-post/:id', postCtrl.unlikePost);
router.patch('/comment-post/:id', postCtrl.commentPost);
router.patch('/edit-comment-post/:id', postCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', postCtrl.deleteCommentPost);

module.exports = router;