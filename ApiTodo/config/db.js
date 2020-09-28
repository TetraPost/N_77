// конфигурация базы данных
module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/todo_list',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
};
