import { useState, useEffect } from "react";
import { getDocumentTypes } from "@/features/users/services/selectService";
import { userSchema } from "../schemas/userSchema";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SquareArrowRightEnter, Menu, File } from "lucide-react";
import { SquareArrowLeft } from "lucide-react";

import {createUser} from "../services/userService";


import { Input, 
    Button,DeleteCounter2,
     Select, Checkbox, IconButton,Dropdown,
      DropdownTrigger, DropdownItem, DropdownContent, 
      FileInput } from "@/shared";


export default function UserRegisterForm() {
    const navigate = useNavigate();

    // estados

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [ documentTypes, setDocumentTypes] = useState([]);
    //Estado
    const [ formData, setFormData ] = useState({

        userName: "",
        userEmail: "",
        userPhone: "",
        userDocumentType: "",
        userDocumentNumber: "",
        userPassword: "",
        userImage: [],

        //Flags booleanos
        isStaff: false,
        isActive: true,
        isSuperUser: false,
    });
    const [errors, setErrors ] = useState({});

    useEffect(() => {
        getDocumentTypes().then(setDocumentTypes);
    },[]);

    //=======================================================================//
    //                              HANDLE GENERICO
    //=======================================================================//

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }
    
    //=======================================================================//
    //                               HANDLE SUBMIT 
    //=======================================================================//

//     const handleSubmit = (e) => {
//     e.preventDefault();

//     const result = userSchema.safeParse(formData);

//     if (!result.success) {
//         const fieldErrors = {};

//         result.error.issues.forEach((issue) => {
//             const field = issue.path[0];
//             fieldErrors[field] = issue.message;
//         });

//         setErrors(fieldErrors);
//         return;
//     }

//     setErrors({});
//     console.log("Usuario válido:", result.data);
// };


const handleSubmit = async (e) => {


  // Evita que el formulario recargue la página
  e.preventDefault();


  // Validamos los datos del formulario contra el esquema Zod
  // safeParse NO lanza excepción, retorna un objeto controlado
  const result = userSchema.safeParse(formData);


  // Si la validación falla
  if (!result.success) {


    // Objeto donde almacenaremos los errores por campo
    const fieldErrors = {};


    // Recorremos cada error generado por Zod
    result.error.issues.forEach((issue) => {
      // issue.path[0] corresponde al nombre del campo
      // issue.message contiene el mensaje de error definido en el schema
      fieldErrors[issue.path[0]] = issue.message;
    });


    // Actualizamos el estado de errores para mostrarlos en la UI
    setErrors(fieldErrors);


    // Cortamos la ejecución: NO se envía nada al backend
    return;
  }


  // Si la validación pasa, limpiamos errores previos
  setErrors({});


  // Activamos estado de envío (útil para deshabilitar el botón)
  setIsSubmitting(true);


  try {
    // Llamamos al servicio frontend que consume la API
    // result.data contiene los datos ya validados por Zod
    const response = await createUser(result.data);


    // Log informativo para desarrollo
    console.log("Usuario creado:", response);


    // Feedback básico al usuario
    alert("Usuario creado correctamente");


    // Navegamos a la vista anterior
    // navigate(-1) equivale a "volver atrás"
    navigate(-1);


  } catch (error) {
    // Capturamos errores de red o errores lanzados por el service
    console.error("Error:", error.message);


    // Mostramos el mensaje de error al usuario
    alert(error.message);


  } finally {
    // Pase lo que pase, desactivamos el estado de envío
    setIsSubmitting(false);
  }
};


    return (
        <div>
            <h1 className=" text-text-primary text-2xl mb-6 text-center pd-6 ">
              Registro de usuario 
            </h1> 
 
            <form 
                className="grid grid-cols-1 items-center gap-6 "
                onSubmit={handleSubmit}
             >
   
            <div className="
                grid grid-cols sm:grid-cols-2
                gap-6 
                my-auto 
                mx-auto 
                border 
                p-[48px] 
                rounded-[6px] 
                "
            >

                    <Input
                        label="Nombre"
                        name="userName"
                        placeholder="Ingrese su nombre"
                        value={formData.userName}
                        onChange={handleChange}
                        error={errors.userName}
                    />
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
                        label="Telefono"
                        name="userPhone"
                        placeholder="Ingrese su telefono"
                        type="tel"
                        value={formData.userPhone}
                        onChange={handleChange}
                        error={errors.userPhone}
                    />
                    <Select
                        label="Tipo de documento"
                        name="userDocumentType"
                        options={documentTypes}
                        value={formData.userDocumentType}
                        onChange={handleChange}
                        error={errors.userDocumentType}
                    />
                    <Input
                    
                        label="numero de documento"
                        name="userDocumentNumber"
                        placeholder="Ingrese su numero de documento"
                        value={formData.userDocumentNumber}
                        onChange={handleChange}
                        error={errors.userDocumentNumber}
                    />
                    <Input        
                        label="Contraseña"
                        name="userPassword"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={formData.userPassword}
                        onChange={handleChange}
                        error={errors.userPassword}
                        autoComplete="new-password"
                    />

                    <Checkbox
                        id="isStaff"
                        name="isStaff"
                        label="Es administrador"
                        checked={formData.isStaff}
                        onChange={handleChange}
                    />
                    <Checkbox
                        id="isActive"
                        name="isActive"
                        label="Activo "
                        checked={formData.isActive}
                        onChange={handleChange}                    
                    />

                    <Checkbox
                        id="isSuperUser"
                        name="isSuperUser"
                        label="Es super usuario"
                        checked={formData.isSuperUser}
                        onChange={handleChange}
                    />


                <div>

                    <h4>
                        Maximo deben ser 12 
                    </h4>
                      <FileInput
                        value={formData.userImage}
                        onChange={(files) => 
                            setFormData((prev) => ({...prev,  userImage: files}))
                        }
                        multiple={true}
                    />
                    {errors.userImage && (
                        <span className="text-red-500 text-sm">{errors.userImage}</span>
                    )}


                </div>
                  

                <div className="flex items-end  justify-end gap-6">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick = {() => navigate(-1)}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="primary"
                        size="md"
                        disabled={isSubmitting}
                    >
                    {/* se pone entre llaves por que es JS */}
                        {isSubmitting ? "guardando..." : "guardar"}

                    </Button>

                    <Link to = "/dashboard">
                        <IconButton>
                            <SquareArrowRightEnter></SquareArrowRightEnter>
                        </IconButton> 
                    </Link>

                    <div className="p-10">
                        <Dropdown>
                            <DropdownTrigger>
                                <IconButton ariaLabel="Menu de usario">
                                    <Menu/>
                                </IconButton>
                            </DropdownTrigger>

                            <DropdownContent className="right-0 w-48">
                                <DropdownItem>
                                    <Link to="/auth" className="block w-full">
                                        Autenticacion
                                    </Link>
                                </DropdownItem>

                                <DropdownItem>
                                    <Link to="/dashboard" className="block w-full">
                                        Panel de control
                                    </Link>
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </div>

                </div>

              </div>
            </form>
        </div>
    );
}