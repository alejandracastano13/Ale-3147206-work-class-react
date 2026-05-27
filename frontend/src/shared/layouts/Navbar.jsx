import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { IconButton, Switch, Dropdown, DropdownTrigger, DropdownItem, DropdownContent } from "@/shared";
import logo from "@/assets/images/logo-2.png";
import { useState } from "react";
import SearchField from "../components/SearchField";


export default function Navbar() {
    const [search, setSearch] = useState("");

    const handleSearch = (value) => {
        console.log("Buscar:", value);
    };

    const handleClear = () => {
        console.log("Campo limpiado");
    };

    const [isActive, setIsActive] = useState(true);

    const handleStatusChange = (value) => {
        setIsActive(value);
        console.log("Nuevo estado", value);
    };

    return (
        <nav className="w-full bg-transparent border-b-2">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className=" hidden sm:block flex items-center ">
                        <Link to={"/dashboard/home"} className="text-h1 font-heading">
                            <img src={logo} alt="logo" className="h-12 w-auto" />   
                        </Link>
                    </div>

                    {/* Switch */}
                    <Switch
                        checked={isActive}
                        onChange={handleStatusChange}
                        size="md"
                        className="hidden sm:inline-flex"
                    />

                    {/* Links de navegacion */}
                    <ul className="hidden md:flex items-center gap-6">
                        <li>
                            <Link to={"/inicio"} className="hover:text-primary transition">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to={"/inicio"} className="hover:text-primary transition">
                                Cursos
                            </Link>
                        </li>
                        <li>
                            <Link to={"/inicio"} className="hover:text-primary transition">
                                Multimedia
                            </Link>
                        </li>
                    </ul>

                    {/* Buscador */}
                    <SearchField
                        value={search}
                        OnChange={setSearch}   // ← aquí
                        onSubmit={handleSearch}
                        onClear={handleClear}
                        placeholder="Buscar productos..."
                        size="md"
                        variant="outline    "
                        className="w-76"
                    />

                    {/* Dropdown usuario */}
                    <div className="p-10">
                        <Dropdown>
                            <DropdownTrigger>
                                <IconButton ariaLabel="Menu de usuario">
                                    <User />
                                </IconButton>
                            </DropdownTrigger>

                            <DropdownContent className="right-0 w-48">
                                <DropdownItem>
                                    <Link to="/dashboard/auth" className="block w-full">
                                        Cerrar sesion
                                    </Link>
                                </DropdownItem>

                                <DropdownItem>
                                    <Link to="/dashboard" className="block w-full">
                                        Panel de control
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/dashboard/userList" className="block w-full">
                                        Gestion de usuarios
                                    </Link>
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </div>

                </div>
            </div>
        </nav>
    );
}