const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to StaffSync API!',
    status: 'Server is running',
  });
});

app.listen(PORT, () => {
  console.log(`StaffSync server running on http://localhost:${PORT}`);
});