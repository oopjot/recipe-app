const express = require("express");
const app = express();

// Middlewares
app.use(express.json({limit: '300mb'}));
app.use("/users", require("./routes/users"));
app.use("/recipes", require("./routes/recipes"));

// MongoDB connection
require('dotenv').config();
const dbConnData = {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'recipes'
};

const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(response => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Slucham Ciebie na ${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

