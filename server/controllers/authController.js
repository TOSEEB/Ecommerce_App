import User from '../models/User.js'
import { generateToken } from '../utils/jwt.js'

// Register user
export async function register(req, res) {
  try {
    const { name, email, password } = req.body

    // Trim whitespace
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

    // Check if user already exists
    const existingUser = await User.findOne({ email: trimmedEmail.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Create new user (password will be hashed by pre-save hook)
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
    console.error('Registration error:', error)
    
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

// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password using model method
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
