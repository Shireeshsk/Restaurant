const jwt = require('jsonwebtoken');

const jwtauthmiddleware = (req,res,next)=>{
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:'Token Not found'});
    }
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).json({error:'unauthorised'});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded 
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid token '})
    }
}

const generateToken = (userdata)=>{
    return jwt.sign(userdata,process.env.JWT_SECRET_KEY,{expiresIn:30000});
}

module.exports = {jwtauthmiddleware , generateToken};