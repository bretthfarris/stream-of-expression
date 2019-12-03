const mongoose = require('mongoose');

function connect(settings, errCallback) {
  mongoose.connect('mongodb+srv://' + settings.server + '/' + settings.database, {
    auth: {
      user: settings.username,
      password: settings.password
    },
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch((err) => errCallback(err));
}

module.exports = {
  connect,
  connection: mongoose.connection,
  model: mongoose.model,
  schema: mongoose.Schema,
  types: mongoose.Types
}