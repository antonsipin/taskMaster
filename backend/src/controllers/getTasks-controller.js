const Group = require('../models/group.model');

const groupTasks = async (req, res) => {
  const { group } = req.body;
  try {
    const group = await Group.findOne({ name: req.body.group });
    res.send(group);
  } catch (error) {
    return res.json({ error: 'Oops!' });
  }
};

module.exports = {
  groupTasks,
};
