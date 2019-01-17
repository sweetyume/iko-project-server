const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const User = require("./usersQueries");

const hashCredentials = user => {
  const salt = bcrypt.genSaltSync(10);
  const credentials = bcrypt.hashSync(user.login + user.password, salt);

  return {
    username: user.username,
    login: user.login,
    credentials: credentials
  };
};

const generateToken = user => {
  const payload = {
    iat: moment().unix(),
    exp: moment()
      .add(14, "days")
      .unix(),
    iss: user.login,
    sub: user.credentials
  };
  return jwt.sign(payload, "thisIsMyAppSecret");
};

const verifyLogin = (reqUser, bddUser) => {
  if (!bddUser) return { success: false, msg: "user does not exist" };
  if (bcrypt.compareSync(reqUser.login + reqUser.password, bddUser.credentials))
    return { success: true, msg: "successfully logged in" };
  else return { success: false, msg: "wrong password" };
};

module.exports = {
  register: async (req, res) => {
    const newUser = hashCredentials(req.body);
    await User.createUser(newUser);
    newUser.token = generateToken(newUser);
    res.send(newUser);
  },
  login: async (req, res) => {
    const result = await User.getUserByLogin(req.body.login);
    const bddUser = result;
    const logged = verifyLogin(req.body, bddUser);
    if (logged.success) {
      bddUser.token = generateToken(bddUser);
      res.send(bddUser);
    } else {
      res.send(logged.msg);
    }
  }
};
