const Group = require('../models/group.model');

const addNewTask = async (req, res) => {
  console.log(req.body);
  try {
    const group = await Group.findOne({ name: req.body.group });
    if (group) {
      group.tasks.push({
        taskId: Math.floor(Math.random() * Math.floor(1000000)),
        taskName: req.body.value,
        completed: [],
      });
      await group.save();
      const groupUpdate = await Group.findOne({ name: req.body.group });
      res.send(groupUpdate);
    } else {
      res.send({ error: 'no groups' });
    }
  } catch (error) {
    console.log('sdsf');

    res.sendStatus(500).end();
  }
};

module.exports = {
  addNewTask,
};
