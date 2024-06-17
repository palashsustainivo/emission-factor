const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith(process.env.AUTH_HEADER_PREFIX)) {
    // Token is missing or does not start with 'Bearer ', return an error response
    return res.status(process.env.UNAUTHORIZED_ERROR).json({ message: process.env.UNAUTHORIZED_MESSAGE });
  }
  // Get the token from the request headers or query parameters
  //const token = req.headers.authorization || req.headers.Authorization || req.query.token;
  const token = authHeader.slice(process.env.AUTH_HEADER_PREFIX.length);
  if (!token) {
    // Token is missing, return an error response
    return res.status(process.env.UNAUTHORIZED_ERROR).json({ message: process.env.UNAUTHORIZED_MESSAGE });
  }

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(process.env.UNAUTHORIZED_ERROR).json({ message: process.env.UNAUTHORIZED_MESSAGE });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } catch (error) {
    // Token is invalid, return an error response
    return res.status(process.env.UNAUTHORIZED_ERROR).json({ message: process.env.UNAUTHORIZED_MESSAGE });
  }
}

module.exports = authMiddleware;