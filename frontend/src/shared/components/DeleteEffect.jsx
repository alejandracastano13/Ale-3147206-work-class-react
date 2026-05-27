// import { useState, useEffect } from "react";

// export default function DeleteEffect(){
    
//     const [message, setMessage] = useState("Cargando...")

//     useEffect(() => {
//         setTimeout(() => {
//             setMessage("Componente cargando ")

//         },2000);
//     },[])
//     return <h1>{message}</h1>
// }

//===========================================================================
//SEGUNDA ACTIVIDAD => useEffect
//===========================================================================

import { useState, useEffect } from "react";

export default function DeleteEffect(){
    console.log("Render")
    
    const [message, setMessage] = useState("Cargando...")

    useEffect(() => {
        console.log("Efecto ejecutado")

        setTimeout(() => {
            setMessage("Componente cargando o montado ")

        },2000);
    },[])
    return <h1>{message}</h1>
}
