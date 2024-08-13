const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config.env' });

const app = express();

// Enable CORS
app.use(cors());

// Connect to database
connectDB();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}));

const User = require('./models/user');

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
    role: '',
    savings: 0,
    checking: 0
  });
  try {
    await user.save();
    req.session.userId = user._id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: 'Email already exists' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).send({ error: 'Invalid email or password' });
  }
  req.session.userId = user._id;
  res.send(user);
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to logout' });
    }
    res.send({ message: 'Logged out successfully' });
  });
});

app.get('/account-summary', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send({ error: 'Not authenticated' });
  }
  const user = await User.findById(req.session.userId);
  res.send(user);
});

app.post('/transaction', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send({ error: 'Not authenticated' });
  }
  const { type, amount } = req.body;
  const user = await User.findById(req.session.userId);
  if (type === 'deposit') {
    user.checking += amount;
  } else if (type === 'withdraw' && user.checking >= amount) {
    user.checking -= amount;
  } else {
    return res.status(400).send({ error: 'Invalid transaction' });
  }
  await user.save();
  res.send(user);
});

const PORT = process.env.PORT || 4000; // Changed to 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
