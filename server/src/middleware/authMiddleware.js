const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET =
  "19891a81d802c5b17786a9ec0f799c37ba405fadf6ffe18300f462965318ac02413e683a6e1e13bbd22b1ccb8b4ee1b9adeb203f0cd4390027443fbfc7ed558c60158bb74405d9c114be69ed50e392b676958f936b14ab9e84964fb5dab4f6df80f0b1909d70cb59db591d5f73e07b65994508140b3c6c06c0fa4c71677ce4935f2b27bc7d855ffa12afb0ae5d3b7a3b40f507d5f670fe95043c07a9d20fc092d5cf14bd961f246aba5689b890edfa11934a95730ed3e6d460b070d9a6a91e64015d2f584cf91feb582c5436f38ffff6ee957076bcae138724f1e9ede7bfdfb7224d5c106da9a5b11b6d3c35874297303f5358360b37a667aa07e25a1c3a92e3";

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
