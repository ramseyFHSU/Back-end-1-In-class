const User = require("../model/User");
const bcrypt = require("bcrypt");

const handelNewUser = async (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password is required!" });

  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    // Encrypt the password
    const hashPwd = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: user,
      password: hashPwd,
    });
    console.log(result);
    res.status(201).json({ success: `New  user ${user} is created!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handelNewUser };
