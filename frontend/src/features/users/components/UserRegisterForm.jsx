import { useState, useEffect } from "react";
import { getDocumentTypes } from "@/features/users/services/selectService";
import { userSchema } from "../schemas/userSchema";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SquareArrowRightEnter, Menu, File } from "lucide-react";
import { SquareArrowLeft } from "lucide-react";


import { Input, Button,DeleteCounter2, Select, Checkbox, IconButton,Dropdown, DropdownTrigger, DropdownItem, DropdownContent, FileInput } from "@/shared";


export default function UserRegisterForm() {
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
    e.preventDefault();

    const result = userSchema.safeParse(formData);

    if (!result.success) {
        const fieldErrors = {};

        result.error.issues.forEach((issue) => {
            const field = issue.path[0];
            fieldErrors[field] = issue.message;
        });

        setErrors(fieldErrors);
        return;
    }

    setErrors({});
    console.log("Usuario válido:", result.data);
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
                    >
                        Guardar
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