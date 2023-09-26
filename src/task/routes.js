const taskRouter = require('express').Router();
const taskController = require('./controllers');
const taskValidator = require('./validators');

// API to create task
taskRouter.post(
  '/',
  taskValidator.validateCreateTask,
  taskController.createTask
);

// API to update task
taskRouter.put(
  '/:id',
  taskValidator.validateUpdateTask,
  taskController.updateTask
);

// API to get all tasks (paginated)
taskRouter.get('/', taskController.getTaskList);

// API to get task metrics
taskRouter.get('/metrics', taskController.getTaskMetrics);

module.exports = taskRouter;
