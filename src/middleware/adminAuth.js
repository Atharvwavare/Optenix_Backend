import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check if authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach admin info to request
    req.admin = decoded;

    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
