const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.RANDOM_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(402).json({ error })
            } else {
                const userId = decodedToken._id;
                const isAdmin = decodedToken.isAdmin;
                req.auth = { userId , isAdmin }
                    next()
            }
        });
    } catch (error){
        res.status(401).json({ error })
    }
}