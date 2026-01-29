// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const protect = (roles = []) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check header exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    // Role-based access control
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
