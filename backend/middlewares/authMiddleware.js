import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
const secretKey = process.env.JWT_SECRET_KEY
const validateToken = async (token) => {
  return jwt.verify(token, secretKey)
}

export const auth = (allowedRoles) => async (req, res, next) => {
  try {
    let token = req.headers['authorization'].split(' ')[1]
    let decoded = await validateToken(token)
    if (allowedRoles.includes(decoded.role)) {
      req.user = decoded
      next()
    } else {
      res
        .status(httpStatus.UNAUTHORIZED)
        .send({ error: 'Invalid Role, Access Denied', status: false })
    }
  } catch (err) {
    console.error('Error in AuthMultipleRoles middleware:', err)
    res.status(httpStatus.UNAUTHORIZED).send({ error: 'Access Denied', status: false })
  }
}
