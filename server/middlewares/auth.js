import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodeData?.id;

        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default auth;
