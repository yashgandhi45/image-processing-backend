const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 3000, ()=> console.log(`Server is running on port ${process.env.PORT || 3000}`));