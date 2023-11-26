const app = require('./app');

const mongoose = require('mongoose');

// const DB_HOST = 'mongodb+srv://mirasovdev:HMshm0YPQPhvnQ1W@db-contacts.atane6n.mongodb.net/db-contacts?retryWrites=true&w=majority';
const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch(error => {
    console.log(error.messege);
    process.exit(1);
  });
