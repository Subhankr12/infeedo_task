const Task = require('../../model/task');
const { successResponse, errorResponse } = require('../../util/response');
const {
  createTaskService,
  updateTaskService,
  getTasksListService,
  getTaskMetricsService,
} = require('./services');

async function createTask(req, res) {
  try {
    const { title, description, status, userId } = req.body;
    const task = await createTaskService({
      userId,
      title,
      description,
      status,
    });

    return successResponse({
      data: {
        task,
      },
      message: 'Task successfully created',
      res,
    });
  } catch (error) {
    console.error(error);
    return errorResponse({
      error,
      res,
      message: 'Failed to create task',
    });
  }
}

async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    const task = await updateTaskService({
      taskId,
      title,
      description,
      status,
    });

    return successResponse({
      data: {
        task,
      },
      message: 'Task successfully updated',
      res,
    });
  } catch (error) {
    console.error(error);
    return errorResponse({
      error,
      res,
      message: 'Failed to update task',
    });
  }
}

async function getTaskList(req, res) {
  try {
    const { page, pageSize, userId } = req.query;
    const tasks = await getTasksListService({ userId, page, pageSize });

    return successResponse({
      data: {
        tasks,
      },
      message: 'Successfully retrieved tasks list',
      res,
    });
  } catch (error) {
    console.error(error);
    return errorResponse({
      error,
      res,
      message: 'Failed to retrieve tasks list',
    });
  }
}

async function getTaskMetrics(req, res) {
  try {
    const { userId } = req.query;
    const metrics = await getTaskMetricsService({ userId });

    return successResponse({
      data: {
        metrics: metrics[0],
      },
      message: 'Successfully retrieved task metrics',
      res,
    });
  } catch (error) {
    console.error(error);
    return errorResponse({
      error,
      res,
      message: 'Failed to retrieve task metrics',
    });
  }
}

module.exports = {
  createTask,
  updateTask,
  getTaskList,
  getTaskMetrics,
};
