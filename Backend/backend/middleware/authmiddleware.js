const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("HEADERS:", req.headers);

    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                message: "No token, authorization denied"
            });
        }

        // extract token FIRST
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        console.log("TOKEN:", token);
        console.log("SECRET:", process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid token",
            error: error.message
        });
    }
};

module.exports = authMiddleware;