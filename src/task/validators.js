const { STATUS_CODES, TASK_STATUSES } = require('../../util/common');
const { errorResponse } = require('../../util/response');
const Task = require('../../model/task');

async function validateCreateTask(req, res, next) {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      throw {
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: 'Required parameters missing!',
      };
    }

    if (title.length > 50) {
      throw {
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: 'Title length cannot be greater than 50 characters!',
      };
    }

    next();
  } catch (error) {
    return errorResponse({
      error,
      res,
    });
  }
}

async function validateUpdateTask(req, res, next) {
  try {
    const { title, status } = req.body;

    const task = await Task.findByPk(req.params.id);
    if (!task) {
      throw {
        code: STATUS_CODES.NOT_FOUND,
        message: 'Task not found!',
      };
    }

    if (title && title.length > 50) {
      throw {
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: 'Title length cannot be greater than 50 characters!',
      };
    }

    if (!Object.values(TASK_STATUSES).includes(status)) {
      throw {
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: `Task status can only be one of ${Object.values(
          TASK_STATUSES
        )}`,
      };
    }

    next();
  } catch (error) {
    return errorResponse({
      error,
      res,
    });
  }
}

module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
