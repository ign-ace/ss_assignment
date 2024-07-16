import jwt from "jsonwebtoken";

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

export { authenticateToken, isAdmin };
