const User = require("../model/User");
const bcrypt = require("bcrypt");

const handelLogin = async (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password is required!" });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    res.json({ success: `User ${user} ls logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handelLogin };
