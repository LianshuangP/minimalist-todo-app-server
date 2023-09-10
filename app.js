const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const authRoutes = require('./routes/auth');
const loginRoutes = require('./routes/login');
const todoRoutes = require('./routes/todo');
require('dotenv').config();


const app = express(); 

//mongoDB connection
const connectionString = process.env.MONGODB_URI; 

if (!process.env.MONGODB_URI) {
    console.error('MongoDB connectionString not configured');
    process.exit(1);
  }

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =>{
    console.log('MongoDB connected')
})
.catch((err) =>{
    console.error('MongoDB connection error', err)
    process.exit(1);
});


// middleware

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// routes
app.use('/auth', authRoutes); 
app.use('/login', loginRoutes);
app.use('/todo', todoRoutes);



//server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started listening on port: ${port}`));
