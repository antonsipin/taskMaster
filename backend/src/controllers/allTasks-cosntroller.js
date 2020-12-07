const Group = require('../models/group.model');

const allTasks = async (req, res) => {
  try {
    const groups = req.body.groupsStore.map((el) => el.groupName);

    let allData = await Promise.all(
      groups.map(async (el) => {
        let data = await Group.findOne({ name: el });
        return data;
      })
    );

    let arr = [];

    for (let i = 0; i < allData.length; i++) {
      for (let y = 0; y < allData[i].tasks.length; y++) {
        arr.push({
          image: allData[i].image,
          taskName: allData[i].tasks[y].taskName,
          completed: [...allData[i].tasks[y].completed],
        });
      }
    }

    res.send(arr);
    console.log(arr);
  } catch (error) {
    return res.json({ error: 'Oops!' });
  }
};

module.exports = {
  allTasks,
};
