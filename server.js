const express = require('express');
const { sequelize } = require('./models');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // JSON データのパース

// API Routes
app.use('/api', apiRoutes);

// Default route (fallback for any unmatched routes)
app.get('/', (req, res) => {
  res.send('Welcome to the Fortune API');
});

// Start Server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
