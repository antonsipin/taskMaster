const mongoose = require('mongoose');
const faker = require('faker');
const dbConnect = require('./src/config/dbConnect');
const Task = require('./src/models/task.model');
const Group = require('./src/models/group.model');
const User = require('./src/models/user.model');
dbConnect();
async function seedBase() {
  let user1 = await new User({
    login: 'Aleksei',
    password: '123',
    groups: [
      { groupId: '3', groupName: 'bootcamp' },
      { groupId: '2', groupName: 'work' },
    ],
  });
  let user2 = await new User({
    login: 'Anton',
    password: '123',
    groups: [
      { groupId: '3', groupName: 'bootcamp' },
      { groupId: '2', groupName: 'work' },
    ],
  });
  let group1 = await new Group({
    name: 'friends',
    image: 'http://placeimg.com/640/480',
    tasks: [
      { taskId: '7', taskName: 'Сходить в зал' },
      { taskId: '8', taskName: 'Подарить подарок' },
      { taskId: '9', taskName: 'Украсить дом к Рождеству' },
    ],
  });
  let group2 = await new Group({
    name: 'family',
    image: 'http://placeimg.com/640/480',
    tasks: [
      { taskId: '11', taskName: 'Приготовить ужин для всей семьи' },
      { taskId: '22', taskName: 'Купить что-то полезное для дома' },
    ],
  });
  let task1 = await new Task({
    name: 'Сделай мостик! Нужен фото пруф!',
    completed: [{ login: 'Aleksei' }],
    post: [
      {
        login: 'Aleksei',
        image: 'http://placeimg.com/640/480',
        likesCount: faker.random.number(),
      },
    ],
  });
  let task2 = await new Task({
    name: 'Virtual Beer Pong',
    completed: [{ login: 'Anton' }],
    post: [
      {
        login: 'Anton',
        image: 'http://placeimg.com/640/480',
        likesCount: faker.random.number(),
      },
    ],
  });
  // await user1.save();
  // await user2.save();
  await group1.save();
  await group2.save();
  // await task1.save();
  // await task2.save();
}
seedBase();
module.exports = seedBase;
