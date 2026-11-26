require('dotenv').config(); // loads .env so process.env.MONGO_URI works, no cap
const express = require('express');  
const mongoose = require('mongoose'); // talks to MongoDB
const app = express();

// ts connects to Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use('/assignments', require('./routes/assignments')); // every /assignments url goes to the routes file

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index')); // home splash page

// Render picks the port online and localhost:3000 when local. DONT touch ts
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Running on ' + PORT));