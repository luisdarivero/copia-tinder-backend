const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      
      if (!req.headers.authorization) {
        return res.status(401).send({ error: "Authorization header must be provided" });
      }

      const { authorization } = req.headers;

      // authorization contiene: "Bearer token";
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.decoded = decoded;
      next(); 
    } catch (error) {
      return res.status(401).send({ error })
    }
  },

  verifySameUser:(req,res,next) => {
    try{
      const tokenUserID= req.decoded.data.id;
      const { id } = req.params;
      if(tokenUserID !== id){
        return res.status(403).send({ error: "You don´t have authorization to use this endpoint" });
      }
      next();
    }
    catch(err){
      return res.status(403).send({ message: "Error al validar el usuario", error })
    }
  }
};
