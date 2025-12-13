const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export function generateToken(user) {
  const userId = user._id ? user._id.toString() : user.id
  return Buffer.from(JSON.stringify({ id: userId, email: user.email, role: user.role })).toString('base64')
}

export function verifyToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    return decoded
  } catch (error) {
    return null
  }
}

export { JWT_SECRET }

