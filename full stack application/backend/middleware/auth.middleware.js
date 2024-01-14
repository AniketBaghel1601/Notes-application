const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(token){
        try {
        const decoded = jwt.verify(token,"Aniket");
        if(decoded){
            req.body.userId = decoded.userId;
            req.body.username = decoded.username;
            console.log(decoded)
            next()
        }
        else{
            res.status(200).json({msg : "you are not authorized"});
        }
    } catch (error) {
        res.status(400).json({err : error});
    }
}
else{
    res.status(200).json({msg : "please Login"});
}

}


module.exports = {
    auth
}