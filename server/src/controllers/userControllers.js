const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "19891a81d802c5b17786a9ec0f799c37ba405fadf6ffe18300f462965318ac02413e683a6e1e13bbd22b1ccb8b4ee1b9adeb203f0cd4390027443fbfc7ed558c60158bb74405d9c114be69ed50e392b676958f936b14ab9e84964fb5dab4f6df80f0b1909d70cb59db591d5f73e07b65994508140b3c6c06c0fa4c71677ce4935f2b27bc7d855ffa12afb0ae5d3b7a3b40f507d5f670fe95043c07a9d20fc092d5cf14bd961f246aba5689b890edfa11934a95730ed3e6d460b070d9a6a91e64015d2f584cf91feb582c5436f38ffff6ee957076bcae138724f1e9ede7bfdfb7224d5c106da9a5b11b6d3c35874297303f5358360b37a667aa07e25a1c3a92e3";

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with:", { email, password });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
