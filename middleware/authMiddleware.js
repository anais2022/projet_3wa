const jwt = require('jsonwebtoken');


const autorisation = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) =>{
            if(err){
                console.log(err.message)
                res.render('connexion', {message : `La session est terminée, veillez vous reconnecter`});
            }
            else{
                console.log(decodedToken)
                next();
            }
        })
    }
    else{
        res.render('connexion', {message : `La session est terminée, veillez vous reconnecter`});
    }
    
  };

  module.exports = { autorisation };
  