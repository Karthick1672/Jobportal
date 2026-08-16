const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const db = new Database('jobnest.db');

// Create Users Table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'candidate',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// REGISTER USER & SEND EMAIL
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insert = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
    insert.run(name, email, hashedPassword, role || 'candidate');

    // Send Welcome Email
    const mailOptions = {
      from: `"JobNest Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to JobNest - Account Created Successfully!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0d6efd;">Welcome to JobNest, ${name}! 🎉</h2>
          <p>Thank you for registering on JobNest.</p>
          <p>Your account has been created successfully with the role: <strong>${role || 'candidate'}</strong>.</p>
          <br>
          <p>You can now log in and explore jobs or post listings!</p>
          <hr>
          <p style="font-size: 12px; color: #777;">If you did not sign up for this account, please ignore this email.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error.message);
      } else {
        console.log('Confirmation email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'User registered successfully! Confirmation email sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// LOGIN USER
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} (SQLite)`));