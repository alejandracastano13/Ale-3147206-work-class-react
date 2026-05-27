import { Outlet } from "react-router-dom"
import heroBg from "@/assets/images/bg-1.jpg";
import {CreateUserPage } from "@/features/users";
import { Link, Navigate } from "react-router-dom";
import { SquareArrowLeft } from "lucide-react";
import { IconButton } from "@/shared";
import { Navbar } from "@/shared";
import { HomePage } from "@/features/home";

export default function MainLayout(){
    return(
        <div className="relative min-h-screen text-text-primary ">

        <div
             className="absolute inset-0 -z-10 bg-cover bg-center"
             style = {{backgroundImage: `url(${heroBg})`}}
             />
                <Navbar/>
                {/* Contenido dinamoco de las paginas*/}

                <main className="min-h-[calc(100vh-4rem)]">
                    <Outlet/>
                </main>

 
         </div>
    );
}