
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "token requerido",
        });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "token invalido",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }catch(error){
        return res.status(401).json({
            message: " token invalido o expirado",
        });
    }
};
