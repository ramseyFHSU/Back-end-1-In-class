const User = require("../model/User");
const bcrypt = require("bcrypt");

const handelNewUser = async (req, res) => {
  const user = req.body.user;
  const pwd = req.body.password;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "UserName and password is required!" });
  //Check for duplicate username in the DB
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    // Encrypt the password
    const hashPwd = await bcrypt.hash(pwd, 10);
    // Create and store the new User
    const result = await User.create({
      username: user,
      password: hashPwd,
    });
    console.log(result);
    res.status(201).json({ success: `New User ${user} is created!` });
  } catch (err) {
    res.status(500).json({ message: ree.message });
  }
};

module.exports = { handelNewUser };
