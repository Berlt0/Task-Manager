import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECURITY_KEY = process.env.SECURITY_KEY;

function verifyToken(req, res, next) {
  try {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, SECURITY_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid token.' });
      }

      req.user = decoded;
      next();
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}

export default verifyToken;
