import jwt from 'jsonwebtoken'

export const userExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    res.status(401).send('Missing or invalid token')
  }

  const { id: userId } = decodedToken
  req.userId = userId

  next()
}
