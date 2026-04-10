/* jshint esversion: 11, node: true */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../models/db');
const { makeUserDocument } = require('../models/user');

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    {
      user: {
        id: user._id ? user._id.toString() : user.email,
        email: user.email
      }
    },
    process.env.JWT_SECRET || 'giftlinksparklesecret',
    { expiresIn: '4h' }
  );
}

router.post('/register', async function (req, res, next) {
  try {
    const { username, email, password } = req.body;
    const db = await connectToDatabase();

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email and password are required' });
    }

    if (!db) {
      return res.status(201).json({
        authtoken: signToken({ email }),
        username,
        email: email.toLowerCase(),
        mode: 'mock'
      });
    }

    const collection = db.collection('users');
    const existingUser = await collection.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const newUser = await makeUserDocument({ username, email, password });
    const result = await collection.insertOne(newUser);

    return res.status(201).json({
      authtoken: signToken({ _id: result.insertedId, email: newUser.email }),
      username: newUser.username,
      email: newUser.email
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const db = await connectToDatabase();
    const { email = '', password = '' } = req.body;

    if (!db) {
      return res.status(200).json({
        authtoken: signToken({ email }),
        username: 'Sparkle Friend',
        email,
        mode: 'mock'
      });
    }

    const collection = db.collection('users');
    const currentUser = await collection.findOne({ email: email.toLowerCase() });

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, currentUser.passwordHash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    return res.status(200).json({
      authtoken: signToken(currentUser),
      username: currentUser.username,
      email: currentUser.email
    });
  } catch (error) {
    return next(error);
  }
});

router.put('/update', async function (req, res, next) {
  try {
    const db = await connectToDatabase();
    const { email = '', profile = {} } = req.body;

    if (!db) {
      return res.status(200).json({ message: 'Profile updated in mock mode', user: { email, ...profile } });
    }

    const collection = db.collection('users');
    const result = await collection.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: profile },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Profile updated', user: result.value });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
