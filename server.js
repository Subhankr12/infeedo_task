const express = require('express');
require('dotenv').config();
const { sequelize } = require('./config/db');
const app = express();

const taskRouter = require('./src/task/routes');

app.use(express.json());

app.use('/tasks', taskRouter);

const port = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
