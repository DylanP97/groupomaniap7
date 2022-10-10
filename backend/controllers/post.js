const PostModel = require('../models/post');
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');


exports.getAllPosts = (req, res, next) => {
   
    PostModel.find().sort({ createdAt: -1 })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({ message: error }))
}


exports.getOnePost = (req, res, next) => {

    PostModel.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
}    

exports.createPost = (req, res, next) => {
    
    const postObject =  req.file ? {
        ...req.body,
        imageUrl: req.file !== null ? "./uploads/posts/" + `${req.file.filename}` : "",
    } : { ...req.body };

    const post = new PostModel({
        ...postObject
    });

    post.save()
    .then(() => { res.status(201).json({message: 'Post ajouté !'})})
    .catch(error => { res.status(400).json( { error })})
}

exports.modifyPost = (req, res, next) => {

    console.log(res.auth)

    const postObject = req.file ? {
        ...req.body,
        imageUrl: `${req.file.filename}`
    } : { ...req.body };

    PostModel.findOneAndUpdate({ _id: req.params.id}, { ...postObject, _id: req.params.id})
        .then(() => {res.status(200).json({message: "Post modifié !"})})
        .catch(error => {res.status(400).json({ error })});
}

exports.deletePost = (req, res, next) => {

        PostModel.findOneAndDelete({ _id: req.params.id })
            .then(() => { res.status(200).json({message: "Post supprimé !"})})
            .catch(error => res.status(401).json({ error }))
         
    .catch(error => res.status(500).json({ error }));
};



module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { usersLiked: req.body.id },
        },
        { new: true })
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
          return res.status(400).send(err);
      }
  };

module.exports.unlikePost = (req, res) => {
if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        PostModel.findByIdAndUpdate(
        req.params.id,
        {
            $pull: { usersLiked: req.body.id },
        },
        { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.commentPost = (req, res) => {
if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                comments: {
                    commenterId: req.body.commenterId,
                    commenterPseudo: req.body.commenterPseudo,
                    text: req.body.text,
                    timestamp: new Date().getTime(),
                },
            },
        },
        { new: true })
                .then((data) => res.send(data))
                .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.editCommentPost = (req, res) => {
if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findById(req.params.id, (err, docs) => {
        const theComment = docs.comments.find((comment) =>
            comment._id.equals(req.body.commentId)
        );

        if (!theComment) return res.status(404).send("Comment not found");
        theComment.text = req.body.text;

        return docs.save((err) => {
            if (!err) return res.status(200).send(docs);
            return res.status(500).send(err);
        });
    });
    } catch (err) {
        return res.status(400).send(err);
}
};

module.exports.deleteCommentPost = (req, res) => {
if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
        req.params.id,
        {
            $pull: {
            comments: {
                _id: req.body.commentId,
            },
            },
        },
        { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};