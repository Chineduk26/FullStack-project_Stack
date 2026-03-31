const jwt = require("jsonwebtoken");

const authware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ No header or wrong format → redirect
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.redirect("/login"); // or whatever your login route is
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.redirect("/login");
    }

    // ✅ Verify token safely
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      return res.redirect("/login");
    }

    // ✅ Ensure decoded has an id
    if (!decoded || !decoded.id) {
      return res.redirect("/login");
    }

    // Attach user object to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Authware error:", err.message);
    return res.redirect("/login");
  }
};

module.exports = authware;
