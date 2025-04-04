const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/imageroutes');
require('dotenv').config();
console.log(process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
.catch(err => console.error(err));
