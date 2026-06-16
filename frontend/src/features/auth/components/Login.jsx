import { useState,  } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SquareArrowRightEnter, Menu } from "lucide-react";

import { login } from "../services/authService";

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
    

  //            Handle Submit
  // ======================================
  /**
   * Función que se ejecuta cuando se envía el formulario
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = LoginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const data = await login(result.data);

      console.log("LOGIN RESPONSE: ", data);

      sessionStorage.setItem("token", data.token); //clave

      navigate("/dashboard/userList");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen ">
      <h1 className="text-text-primary text-2xl mb-6 text-center pt-6">
        Inicio de Sesión
      </h1>

      <form
        className="grid grid-cols-1 items-center gap-6"
        onSubmit={handleSubmit}
      >
        {/* Inputs */}
        <div className="grid grid-cols-1 gap-6 my-auto mx-auto border p-[48px] rounded-[6px] ">

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
            label="Contreseña"
            name="userPassword"
            placeholder="Ingrese su contraseña"
            type="password"
            value={formData.userPassword}
            onChange={handleChange}
            error={errors.userPassword}
          />


          {/* Actions */}
          <div className="flex items-center justify-center gap-12">
            <Button variant="secondary" size="sm" >
              Cancelar
            </Button>

            <Button 
            variant="primary" 
            size="md" 
            type="submit">
              Ingresar
            </Button>

            {/* Icon button */}
            {/* <Link to="/dashboard">
              <IconButton variant="ghost">
                <SquareArrowRightEnter />
              </IconButton>
            </Link> */}

            {/* <a href="/DashboardLayout">
              <IconButton>
                <SquareArrowRightEnter />
              </IconButton>
            </a> */}

            {/* <IconButton onClick={() => navigate("/DashboardLayout")}>
                <SquareArrowRightEnter />
              </IconButton> */}
          </div>
        </div>
      </form>
    </div>
  );
}