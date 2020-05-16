const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!req.headers.authorization) {
        return res.status(403).send({ error: "Authorization header must be provided" });
      }
      
      // authorization contiene: "Bearer token";
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.decoded = decoded;
      next();
      
       
    } catch (error) {
      res.status(403).send({ error })
    }
  },
};