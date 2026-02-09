const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../controller/user");

// helper function to get user from token
const getUserFromToken = async (req) => {
  const { authorization = "" } = req.headers;
  if (!authorization.startsWith("Bearer ")) return null;

  const token = authorization.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await getUserByEmail(decoded.email);
  return user;
};

// Check if the user is logged in
const isValidUser = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req);
    console.log(user);
    if (!user) return res.status(401).send({ error: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Unauthorized" });
  }
};

// Check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req);
    if (!user || user.role !== "admin")
      return res.status(403).send({ error: "Forbidden" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send({ error: "Forbidden" });
  }
};

// Check if user is either a normal user or admin
const isUserOrAdmin = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) return res.status(401).send({ error: "Unauthorized" });
    // anyone logged in is allowed
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = {
  isValidUser,
  isAdmin,
  isUserOrAdmin,
};
