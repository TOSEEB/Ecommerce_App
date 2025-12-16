import User from '../models/User.js'
import { generateToken } from '../utils/jwt.js'

export async function register(req, res) {
  try {
    const { name, email, password } = req.body

    const trimmedName = name?.trim()
    const trimmedEmail = email?.trim()
    const trimmedPassword = password?.trim()

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      return res.status(400).json({
        error: 'All fields are required',
        details: {
          name: !trimmedName ? 'Name is required' : null,
          email: !trimmedEmail ? 'Email is required' : null,
          password: !trimmedPassword ? 'Password is required' : null,
        },
      })
    }

    const existingUser = await User.findOne({ email: trimmedEmail.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const newUser = new User({
      name: trimmedName,
      email: trimmedEmail.toLowerCase(),
      password: trimmedPassword,
      role: 'user',
    })

    await newUser.save()

    const token = generateToken(newUser)
    res.status(201).json({
      success: true,
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      token,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ error: errors.join(', ') })
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' })
    }
    
    res.status(500).json({ error: error.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await user.comparePassword(password)

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(user)
    res.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
