const Task = require('../models/task.model');

const getPosts = async (req, res) => {
  try {
    const task = await Task.findOne({ name: req.body.taskName });
    if (task) {
      res.send(task.post);
    } else {
      res.send({ error: 'no posts' });
    }
  } catch (error) {
    console.log('sdsf');

    res.sendStatus(500).end();
  }
};

module.exports = {
  getPosts,
};
