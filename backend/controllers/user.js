const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');

const maxAge = 3 * 24 * 60 * 60 * 1000;

// const createToken = (id) => {
//     return jwt.sign({id}, process.env.RANDOM_TOKEN_SECRET, {
//       expiresIn: maxAge
//     })
// };


exports.signup = (req, res)=>{

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = UserModel.create({
            email: req.body.email,
            password: hash,
            pseudo: req.body.pseudo,
        })
            .then(() => res.status(201).json({ message: 'user created' }))
            .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}



//connection d'un utilisateur 
exports.login = (req, res)=>{
    const email = req.body.email

    UserModel.findOne({ where: { email: email } })
        .then((user) => {
            if(!user) return res.status(404).json({ error: 'user not found!' })
            const validPassword = bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                res.status(200).json({
                    token: jwt.sign(
                        { 
                        userId: user._id,
                        isAdmin: user.isAdmin 
                        },
                        process.env.RANDOM_TOKEN_SECRET,
                        { expiresIn: '24h' },
                    )
                })
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
                })
        .catch(error => res.status(500).json({ error }))
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

    UserModel.findOneAndUpdate({ _id: req.params.id },{ ...userObject, $set: { bio: req.body.bio, } },
        { new: true, upsert: true, setDefaultsOnInsert: true })

        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
} 

exports.deleteUser = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.findOne({ _id: req.params.id })
    .then(user => {
        
        const filename = user.imageUrl.split('/uploads/profil/')[1]
        fs.unlink(`/uploads/profil/${filename}`, () => {
            UserModel.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: "Compte supprimé !"})})
            .catch(error => res.status(401).json({ message : "Non-authorisé 2" }));
        })
    })
    .catch(error => res.status(500).json({ error }));
}
