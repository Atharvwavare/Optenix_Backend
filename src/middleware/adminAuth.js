import jwt from "jsonwebtoken";


export const adminAuth = (req, res, next) => {
const token = req.headers.authorization;


if (!token) {
return res.status(401).json({ message: "No token, access denied" });
}


try {
const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
req.admin = decoded;
next();
} catch (error) {
res.status(401).json({ message: "Invalid token" });
}
};