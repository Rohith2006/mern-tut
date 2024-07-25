const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model.js'); // Import the User model
const Product = require('./models/product.js'); // Import the Product model

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoURI = 'mongodb+srv://rohiththirunagari515:rohith2006@cluster0.hnltawe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// API Endpoints
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/product/post', async (req, res) => {
  try {
    const { title, image, description, price } = req.body;

    // Check if all required fields are provided
    if (!title || !image || !description || !price) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check if the product already exists
    const existingProduct = await Product.findOne({ image, title });
    if (existingProduct) {
      return res.status(400).json({ msg: 'Product already exists' });
    }

    // Create a new product
    const newProduct = new Product({ title, image, description, price });
    await newProduct.save();

    res.json({ message: 'Product listed successfully', product: newProduct });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// server.js

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/hello', (req, res) => {
  res.send('hello page');
});

// Start the server
app.listen(1337, () => {
  console.log('Server started on port 1337');
});
