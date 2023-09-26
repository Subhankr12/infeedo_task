const Task = require('../../model/task');
const { sequelize } = require('../../config/db');

async function createTaskService(params) {
  const { userId, title, description, status } = params;
  const task = await Task.create({
    userId,
    title,
    description,
    status,
  });

  return task;
}

async function updateTaskService(params) {
  const { title, description, status, taskId } = params;
  const task = await Task.findByPk(taskId);

  task.title = title;
  task.description = description;
  task.status = status;
  task.updatedAt = new Date();
  await task.save();

  return task;
}

async function getTasksListService(params) {
  const { userId, page = 1, pageSize = 10 } = params;
  const offset = (+page - 1) * +pageSize;
  const tasks = await Task.findAll({
    where: {
      user_id: userId,
    },
    offset,
    limit: +pageSize,
  });

  return tasks;
}

async function getTaskMetricsService(params) {
  const { userId } = params;
  const metrics = await sequelize.query(`
        SELECT 
        DATE_FORMAT(created_at, '%D %M %Y') AS date,
        SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS open_tasks,
        SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) AS inprogress_tasks,
        SUM(CASE WHEN status = 3 THEN 1 ELSE 0 END) AS completed_tasks
        FROM tasks
        WHERE user_id = ${userId}
        GROUP BY date
        ORDER BY date;
    `);

  return metrics;
}

module.exports = {
  createTaskService,
  updateTaskService,
  getTasksListService,
  getTaskMetricsService,
};
