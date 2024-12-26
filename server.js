const express = require('express');
const mongoose = require('mongoose');
const formRoutes = require('./routes/formRoutes');
const fieldRoutes = require('./routes/fieldRoutes');

const app = express();


app.use(express.json());


app.use('/forms', formRoutes);
app.use('/fields', fieldRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/form-api')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch((err) => console.error('Error connecting to MongoDB', err));
