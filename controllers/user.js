const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');



const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, 'RANDOM_TOKEN_SECRET', {
      expiresIn: maxAge
    })
  };

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new UserModel({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}


exports.login = (req, res, next) => {
    UserModel.findOne({email: req.body.email})
    .then(user => {
        if (user === null){
            res.status(401).json({message: "Paire email/mot de passe incorrecte"})
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: 'Paire email/mot de passe incorrecte'})
                } else {
                    const token = createToken(user._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge});
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id},
                            // 'RANDOM_TOKEN_SECRET',
                            // { expiresIn: maxAge }
                            )
                    });
                }
            })
            .catch(error => {
                console.log("error ici")
                res.status(500).json({error})
            })
        }
    })
    .catch(error => {
        res.status(500).json({error});
    });
}


exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
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
        imageUrl: `${req.file.filename}`
    } : { ...req.body };

    UserModel.findOneAndUpdate({ _id: req.params.id },
        { ...userObject, $set: { bio: req.body.bio, } },
        { new: true, upsert: true, setDefaultsOnInsert: true })

        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
} 


exports.deleteUser = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.findOne({ _id: req.params.id })
    .then(user => {
        
        const filename = user.imageUrl.split('/images/')[1]
        fs.unlink(`/images/${filename}`, () => {
            UserModel.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: "Compte supprimé !"})})
            .catch(error => res.status(401).json({ message : "Non-authorisé 2" }));
        })
    })
    .catch(error => res.status(500).json({ error }));
}


