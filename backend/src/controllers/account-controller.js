const User = require('../models/user.model');

const account = async (req, res) => {

  try {

    const user = await User.findOne({ login: req.body.user });

    res.send(user.groups)

  } catch (error) {
    res.sendStatus(500).end();
  }
};


module.exports = {
  account
};
