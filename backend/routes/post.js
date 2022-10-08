const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post')

// middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', multer, postCtrl.createPost);
router.put('/:id', multer, postCtrl.modifyPost);  
router.delete('/:id', postCtrl.deletePost);
router.patch('/like/:id', postCtrl.likePost);   // /like/:id
router.patch('/unlike/:id', postCtrl.unlikePost);  // delete -post
router.patch('/add-comment/:id', postCtrl.commentPost);    // on aurait pu creér les commentaire ) part
router.patch('/edit-comment/:id', postCtrl.editCommentPost);
router.patch('/delete-comment/:id', postCtrl.deleteCommentPost);

module.exports = router;