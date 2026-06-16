// Importamos Router desde Express.
// Router permite modularizar las rutas por feature
// y mantener el archivo principal de la app limpio.
import { Router } from "express";
import   multer  from "multer";
import {userController  } from "./user.controller.js";
import { authenticateToken  } from "../../middleware/auth.middleware.js";



// Inicializamos el router
const router = Router();

const upload= multer ({ dest: "uploads/"});

// Definimos la ruta para crear un usuario
// POST /users
// Cuando se recibe una petición POST en la raíz del recurso,
// Express ejecuta el método create del controller.
router.post(
    "/", 
    authenticateToken, 
    upload.array("userImage"), 
    userController.create);

export default router;