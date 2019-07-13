const express = require(`express`);
const cors = require(`cors`);
const helmet = require(`helmet`);
const bodyParser = require(`body-parser`);
const mongoose = require('mongoose');
const app = express();

const mongoUri = 'mongodb+srv://admin:admin@cluster0-y9ans.gcp.mongodb.net/test?retryWrites=true&w=majority'
const connectDB = () =>
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
    .then(() => console.log('DB Connected'))
    .catch(() => console.log('Failed to connect DB!'));

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const {
  userList,
  getUserById,
  addUser,
} = require('./modules/users');

const {
  login,
} = require('./modules/auth');

app.post(`/login`, login);
app.get(`/users`, userList);
app.put(`/users/:id`, getUserById);
app.post(`/users`, addUser);

app.listen(5000, () => {
  console.log(`App Running Upl`);
});