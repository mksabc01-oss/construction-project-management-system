const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/workers',  require('./routes/workers'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/sites',    require('./routes/sites'));          // ✅ Sites routes
app.use("/api/tasks", require("./routes/tasks"));
app.use('/api/users', require('./routes/userAccounts'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));