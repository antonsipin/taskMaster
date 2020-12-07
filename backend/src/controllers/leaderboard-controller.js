const Group = require('../models/group.model');
const Task = require('../models/task.model');

const leaderboard = async (req, res) => {
  try {
    const allTasks = await Group.findOne({ name: req.body.group });
    let arr = [];
    for (let i = 0; i < allTasks.tasks.length; i++) {
      for (let y = 0; y < allTasks.tasks[i].completed.length; y++) {
        arr.push(allTasks.tasks[i].completed[y]);
      }
    }

    let result = [];
    for (let el of arr) {
      result.push({ el });
    }

    let counter = {};
    result.forEach(function (obj) {
      let key = obj.el;
      counter[key] = (counter[key] || 0) + 5;
    });

    let allUsers = allTasks.users;

    for (let i = 0; i < allUsers.length; i++) {
      if (Object.keys(counter).length === 0) {
        key = allUsers[i];
        counter[key] = 0;
        i++;
      }

      for (let key in counter) {
        if (!(allUsers[i] in counter) || Object.keys(counter).length === 0) {
          key = allUsers[i];
          counter[key] = 0;
          i++;
        }
      }
    }

    let finalResult = [];
    for (var prop in counter) {
      if (Object.prototype.hasOwnProperty.call(counter, prop)) {
        finalResult.push({ login: prop, points: counter[prop] });
      }
    }

    res.send(finalResult);
  } catch (error) {
    res.sendStatus(500).end();
  }
};

module.exports = {
  leaderboard,
};
