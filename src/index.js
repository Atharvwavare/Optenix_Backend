import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./server.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
