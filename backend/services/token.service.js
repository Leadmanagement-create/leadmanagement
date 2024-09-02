import jwt from 'jsonwebtoken'
import { tokenModel } from '../models/tokenModel.js'
import { ObjectId } from 'mongodb'
import 'dotenv/config'
import moment from 'moment'
const secretKey = process.env.JWT_SECRET_KEY

const generateJwtToken = (userId) => {
  const payload = { userId }
  const options = { expiresIn: '4h' }
  return jwt.sign(payload, secretKey, options)
}

const saveToken = async (token, userId, role, expires, blacklisted = false) => {
  const tokenDoc = await tokenModel.create({
    token,
    userId,
    role,
    expires: expires.toDate(),
    blacklisted,
  })
  return tokenDoc
}

const generateAuthTokens = async (tokenData) => {
  try {
    const accessTokenExpires = moment().add(4, 'hours')
    const { _id, role } = tokenData

    const payload = {
      sub: _id.toHexString(),
      role,
      iat: moment().unix(),
      exp: accessTokenExpires.unix(),
      type: 'access',
    }

    const accessToken = jwt.sign(payload, secretKey) 

    await saveToken(accessToken, _id, role, accessTokenExpires)

    return accessToken 
  } catch (error) {
    throw new Error(`Failed to create token: ${error.message}`)
  }
}

const getTokenById = async (id) => {
  try {
    return await tokenModel.findById(id).exec()
  } catch (error) {
    throw new Error(`Failed to get token by ID: ${error.message}`)
  }
}

const updateToken = async (id, updates) => {
  try {
    return await tokenModel.findByIdAndUpdate(id, updates, { new: true }).exec()
  } catch (error) {
    throw new Error(`Failed to update token: ${error.message}`)
  }
}

const deleteToken = async (id) => {
  try {
    return await tokenModel.findByIdAndDelete(id).exec()
  } catch (error) {
    throw new Error(`Failed to delete token: ${error.message}`)
  }
}

export { generateAuthTokens, generateJwtToken, getTokenById, updateToken, deleteToken }
