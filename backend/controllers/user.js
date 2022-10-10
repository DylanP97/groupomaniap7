const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const ObjectID = require("mongoose").Types.ObjectId;
const { signUpErrors, signInErrors } = require('../middleware/errors');
const fs = require('fs');


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.RANDOM_TOKEN_SECRET, {
      expiresIn: maxAge
    })
};


exports.signup = async (req, res, next) => {

    const {pseudo, email, password} = req.body

    try {
        const user = await UserModel.create({pseudo, email, password });
        user.save()
        res.status(201).json({ message: 'Utilisateur créé !'})
    }  
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).json({ errors })
      }
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
      const user = await UserModel.login(email, password);
      const token = createToken(user._id);
      res.auth = user._id;
      res.cookie('jwt', token, { httpOnly: false, maxAge});
      res.status(200).json({ user: user._id})
    } catch (err){
      const errors = signInErrors(err);
      res.status(200).json({ errors });
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', ' ', { maxAge: 1 });
    res.redirect('/');
}

exports.getAllUsers = (req, res, next) => {

    UserModel.find().select("-password")
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json({ error }));
}

exports.getOneUser = (req, res, next) => {

    UserModel.findOne({ _id: req.params.id }).select("-password")
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
}    

exports.updateUser = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const userObject = req.file ? {
        ...req.body,
        imageUrl: req.file !== null ? "./uploads/profil/" + `${req.file.filename}` : "",
    } : { ...req.body };

    if (req.params.id === res.auth || res.isadmin === true) {

        UserModel.findOneAndUpdate({ _id: req.params.id },{ ...userObject, $set: { bio: req.body.bio, } },
            { new: true, upsert: true, setDefaultsOnInsert: true })

            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

    } else {
        { res.status(401).json({message: "Vous n'êtes pas authorisé à modifier cete utilisateur!"})}
    }
}

exports.deleteUser = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.findOne({ _id: req.params.id })
    .then(user => {

        if (req.params.id === res.auth || res.isadmin === true) {

        const filename = user.imageUrl.split('/uploads/profil/')[1]
        fs.unlink(`/uploads/profil/${filename}`, () => {
            UserModel.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: "Compte supprimé !"})})
            .catch(error => res.status(401).json({ message : "Non-authorisé 2" }));
        })

        } else {
            { res.status(401).json({message: "Vous n'êtes pas authorisé à supprimer cete utilisateur!"})}
        }
    })
    .catch(error => res.status(500).json({ error }));
}