// server/server.js
// Assignment 7 — Express backend for PlateScout.
// Now backed by MongoDB Atlas (via Mongoose) with bcrypt-hashed passwords
// and JWT-based session tokens.

require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware — mount BEFORE any route.
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://assignment8-snail-dust.vercel.app",
    /\.vercel\.app$/,
  ],
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(console.log("MongoDB connected."))
.catch((err) => {console.error(err)});

const userSchema = new Schema({
  username: {type: String, required: true, unique: true, trimmed: true, minlength: 3},
  email: {type: String, required: true, unique: true, lowercase: true, trimmed: true},
  password: {type: String, required: true, minlength: 8},
  createdAt: {type: Date, default: Date.now}
});

const User = mongoose.model("User", userSchema);

// Shared validator — same as A6 (plain-text rules applied BEFORE we hash).
function validateInputs({ username, email, password }) {
  if (!username || username.trim().length < 3) {
    return "Username must be at least 3 characters.";
  }
  if (email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
  }
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return "";
}

// ============================================================
// POST /api/register
// ============================================================
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const validationError = validateInputs({ username, email, password });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const user = await User.findOne({ username })
    if(user){
      return res.status(409).json({ error: "Username already taken." })
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hash });

    return res.status(201).json({
      message: "User registered successfully.",
      user: { username, email },   // never echo the password or the hash
    });
  } catch (error) {
    console.error("Register error:", error);
    // Mongoose duplicate-key error (race condition past the findOne check)
    if (error.code === 11000) {
      return res.status(409).json({ error: "Username or email already taken." });
    }
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// POST /api/login
// ============================================================
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });
    
    if(!user){
      return res.status(401).json({ error: "Invalid username or password."})
    }
    
    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
      return res.status(401).json({ error: "Invalid username or password."})
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    return res.status(200).json({
      message: "Login successful.",
      user: { username: user.username, email: user.email },
      token,   // the JWT — the client saves this in localStorage
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// POST /api/logout
// ============================================================
app.post("/api/logout", (req, res) => {
  token = req.headers.authorization;
  if(!token || !token.startsWith("Bearer ")){
    return res.status(401).json({ error: "Missing or invalid token." });
  }else{
    token = token.slice(7);
  }

  try{
    jwt.verify(token, process.env.JWT_SECRET);
  }catch(err){
    console.error("Missing or invalid token.");
  }

  return res.status(200).json({ message: "Logged out." });
});

// ============================================================
// GET /api/health
// ============================================================
app.get("/api/health", (req,res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    mongo: mongoose.connection.readyState === 1
  });
});

// ============================================================
// POST /api/yelp
// ============================================================
app.post("/api/yelp", async (req,res) => {
  console.log(req.body);

  const {term, location, sort_by, limit} = req.body;

  // Create URL search parameters using term, location, sort_by, and limit
  const params = new URLSearchParams({
    term, 
    location, 
    sortBy: sort_by, 
    lim: limit,
  });

  // Send a fetch request to the yelp backend search endpoint
  const SEARCH_PATH = "https://api.yelp.com/v3/businesses/search";
  console.log(`${SEARCH_PATH}?${params}`);
  const response = await fetch(`${SEARCH_PATH}?${params}`,{
    headers: {
            Authorization: `Bearer ${process.env.YELP_KEY}`,
          },
  });

  if(!response.ok) {
    return res.status(response.status).json({ message: "Yelp request failed."});
  }else{
    const data = await response.json();

    return res.status(response.status).json(data);
  }
})

// 404 fallback — must come AFTER every route or it'll eat them.
app.use((req, res) => {
  return res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
