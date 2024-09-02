import {
  // createToken as createTokenService,
  getTokenById as getTokenByIdService,
  updateToken as updateTokenService,
  deleteToken as deleteTokenService,
} from '../services/token.service.js'

// const createToken = async (req, res) => {
//   try {
//     const token = await createTokenService(req.body)
//     res.status(200).json(token)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

const getTokenById = async (req, res) => {
  try {
    const token = await getTokenByIdService(req.params.id)
    if (!token) {
      return res.status(404).json({ message: 'Token not found' })
    }
    res.json(token)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateToken = async (req, res) => {
  try {
    const token = await updateTokenService(req.params.id, req.body)
    if (!token) {
      return res.status(404).json({ message: 'Token not found' })
    }
    res.json(token)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteToken = async (req, res) => {
  try {
    const token = await deleteTokenService(req.params.id)
    if (!token) {
      return res.status(404).json({ message: 'Token not found' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getTokenById, updateToken, deleteToken }
