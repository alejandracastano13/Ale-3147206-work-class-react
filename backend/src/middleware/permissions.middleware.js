
import {accessService} from "../features/access/access.service.js"

export const requierePermission = (permissionCode) => {
    return async (req, res, next) => {
        const userId = req.user.id;

        const granted = await accessService.hasPermission(userId, permissionCode);

        if (!granted) {
            return res.status(403).json({
                message: " no tiene permisos esta accion"
            });
        }
        next();
    }
}