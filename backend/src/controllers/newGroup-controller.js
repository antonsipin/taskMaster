const User = require('../models/user.model');
const Group = require('../models/group.model');

const addNewGroup = async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    if (user) {
      user.groups.push({
        groupId: (Math.floor(Math.random() * Math.floor(1000000))).toString(),
        groupName: req.body.newGroupName,
      });
      await user.save();
      const userUpdate = await User.findOne({ login: req.body.login });

      let newGroup = new Group({
        tasks: [],
        name: req.body.newGroupName,
        image: ''
      })
      await newGroup.save();

      res.send(userUpdate.groups);
    } else {
      res.send({ error: 'no groups' });
    }
  } catch (error) {
    console.log('sdsf');

    res.sendStatus(500).end();
  }
};

module.exports = {
  addNewGroup,
};
