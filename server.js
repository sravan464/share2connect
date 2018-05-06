const express = require('express');
const mongoose = require('mongoose');
const mongoURI = require('./config/keys').mongoURI;
const logger = require('./util/logger');
const app = express();
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

// Database Config
const db = mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => logger.info(' mongoDB connected'))
  .catch(err => logger.error('connection failed', err));

app.get('/', (req, res) => res.send('hello world'));

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.PORT || 6464;

app.listen(port, () => console.log(`server running on port ${port}`));
