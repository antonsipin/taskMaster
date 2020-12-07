const Task = require('../models/task.model');

const addLike = async (req, res) => {
  try {
    let task = await Task.findOne({ name: req.body.taskName });

    if (task) {
      task.post.filter((el) => {
        if (el.image === req.body.img) {
          el.likesCount.push(req.body.login);
        }
      });

      let updateTask = new Task({
        completed: task.completed,
        name: task.name,
        post: task.post,
      });

      await Task.deleteOne({ name: req.body.taskName });
      await updateTask.save();

      res.send(task.post);
    } else {
      res.send({ error: 'no groups' });
    }
  } catch (error) {
    console.log('sdsf');

    res.sendStatus(500).end();
  }
};

module.exports = {
  addLike,
};
