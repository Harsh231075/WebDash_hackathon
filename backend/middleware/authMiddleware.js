import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};


// const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // ✅ Get token from headers
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }
//     console.log(token);
//     // ✅ Verify Token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with actual secret key
//     req.user.id = decoded.id; // ✅ Attach user ID to request
//     // console.log(decoded);
//     // ✅ Check if user exists
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User Not Found" });
//     }

//     next(); // ✅ Proceed to next middleware/controller
//   } catch (error) {
//     console.error("Auth Error:", error);
//     return res.status(403).json({ message: "Invalid or Expired Token" });
//   }
// };

export default protect;