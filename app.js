const express = require('express');
const app = express();
const postsRoutes = require('./api/posts/posts.routes');
const connectDb = require('./database');
const cors = require('cors');

app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

//Routes
app.use('/api/posts', postsRoutes);

//error handeling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error"});
});


//Path Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found"});
});

connectDb();

app.listen(8002, () => {
  console.log('The application is running on localhost:8002');
});
