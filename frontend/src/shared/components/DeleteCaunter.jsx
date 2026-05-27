// import { usestate } from "react";

// export default function DeleteCaunter(){
//     //crear el estado 
//     const [count, setCount] = usestate(0)

//     return(
//         <div>
//             <p>Contador: { count}</p>
//             <button onClick={() => setCount(count + 1)} className="border px-[12px
//             ]" >
//                 Incrementar

//             </button>
//         </div>

//     );
// }

export default function DeleteCaunter(){
    let count = 0;

    const incrementar = () => {
        count = count + 1;
        console.log("Nuevo valor", count)
    }

    return(
        <div>

            <p> Contador: { count} </p>
            <button onClick={incrementar} className="border p-[12px]"> Incrementar</button>
        
        </div>

    )
}