
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to StaffSync API!',
    status: 'Server is running',
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`StaffSync server running on http://localhost:${PORT}`);
  });
};

startServer();
