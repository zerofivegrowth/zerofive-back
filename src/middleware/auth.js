import jwt from "jsonwebtoken"
 export const verifyToken = (req, res, next) => {
  let token = req.header("auth");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, jwtSecretKey);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
