const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');
const { TASK_STATUSES } = require('../util/common');

const Task = sequelize.define(
  'task',
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: TASK_STATUSES.OPEN,
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
      defaultValue: Sequelize.NOW,
    },
  },
  { timestamps: false }
);

module.exports = Task;
