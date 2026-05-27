import {  z } from "zod";

export const LoginSchema = z.object({

    userEmail: z 
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Debe ingresar un email valido"),

    userPassword: z   
        .string()
        .min(8, "Contraseña debe tener un minimo de 8 carecteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayuscula")
        .regex(/[a-z]/, "Debe contener al menos una minuscula")
        .regex(/[0-9]/, "Debe contener al menos un numero")
        .regex(/[^A-Za-z0-9]/, "Debe contener al menos un caracter especial"),
        
})
