import { useState,  } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SquareArrowRightEnter, Menu } from "lucide-react";


import {
  Input,
  Button,
} from "@/shared";
import { LoginSchema } from "../schemas/loginShema";



export default function UserRegisterForm() {
    const navigate = useNavigate();

    // const [ documentTypes, setDocumentTypes] = useState([]);
    //Estado
    const [ formData, setFormData ] = useState({

        userEmail: "",
        userPassword: "",

        //Flags booleanos
        isStaff: false,
        isActive: true,
        isSuperUser: false,
    });
    const [errors, setErrors ] = useState({});



    //=======================================================================//
    //                              HANDLE GENERICO
    //=======================================================================//

    /**
     * Funcion que se ejecuta cada vez que cambia el valor de un input del
     * formulario
     * cuando el usuario escribe cambia los nuevos datos 
     */
    const handleChange = (e) => {
        //se obtiene el nombre del campo y su valor 
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            //se copian todos los valores anteriores del estado
            ...prev,

            //Se actualiza unicamnete lo que cambio 
            [name]: type === "checkbox" ? checked : value,

        }));
    }
    
    //=======================================================================//
    //                               HANDLE SUBMIT 
    //=======================================================================//

    /**
     * Funcion que se ejecuta cuando se envia al formulario 
     */

    // Función que se ejecuta cuando se envía el formulario
    const handleSubmit = (e) => {
    // Evita que el formulario recargue la página
    e.preventDefault();

    // Se valida el objeto formData usando el esquema definido con Zod
    // safeParse devuelve un objeto indicando si la validación fue exitosa o no
    const result = LoginSchema.safeParse(formData);

    // Si la validación falla
    if (!result.success) {
        // Objeto donde se almacenarán los errores por campo
        const fieldErrors = {};

        // Zod devuelve los errores en un arreglo llamado issues
        // Se recorren para asociar cada error a su campo correspondiente
        result.error.issues.forEach((issue) => {
            // issue.path contiene la ruta del campo que falló
            const field = issue.path[0];

            // Se guarda el mensaje de error en el objeto fieldErrors
            fieldErrors[field] = issue.message;
        });

        // Se actualiza el estado de errores para mostrarlos en el formulario
        setErrors(fieldErrors);

        // Se detiene la ejecución porque el formulario tiene errores
        return;
    }
    // Si la validación es exitosa se limpian los errores anteriores
    setErrors({});

    // result.data contiene los datos ya validados por Zod
    console.log("Usuario válido:", result.data);
};

    return (
        <div className="flex flex-col justify-center items-center h-screen ">
            <h1 className=" text-text-primary text-2xl mb-6 text-center pd-6 ">
              Inicio de Sesion 
            </h1> 
 
            <form 
                className="grid grid-cols-1 items-center gap-6 "
                onSubmit={handleSubmit}
             >
   
              {/**Inputs */}
              <div className="grid grid-cols-1 my-0 mx-auto gap-6  border p-[24px] rounded-2xl">

                    
                    <Input   
                        label="Correo"   
                        name="userEmail"                 
                        type="email"
                        placeholder="Ingrese su correo"
                        value={formData.userEmail}
                        onChange={handleChange}
                        error={errors.userEmail}
                    />
                    <Input        
                        label="Contraseña"
                        name="userPassword"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={formData.userPassword}
                        onChange={handleChange}
                        error={errors.userPassword}
                    /> 
                {/* Actions */}
                <div className="flex items-end  justify-end gap-6">
                    <Button
                        variant="secondary"
                        size="sm"
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="primary"
                        size="md"
                        onClick = {() => navigate("/dashboard")} 
                    >
                        Ingresar
                        
                    </Button>              
                </div>
              </div>
            </form>
        </div>
    );
}