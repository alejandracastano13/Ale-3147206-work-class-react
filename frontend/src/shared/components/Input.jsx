export default function Input({
    label,
    type = "text",
    error,
    ...props
}){
    //Curpo de la funcion 
    return(
        //Contenedor del input que se exporta con label curpo y feedback message
          <div className="w-[320px]">
            {/* Label */ }

         {label && (

            <label 
                className={
                    `
                    block
                    text-[8px]
                    mb-1
                    place-self-start
                    ${error ? "text-red-600" : "text-text-primary"}
                 `}
            >
                    {label}
            </label>
         )}   


            {/* contenedor del input */ }
            <div
                className="
                    relative
                    h-12
                    flex
                    items-center
                " 
            >
                {/* Area interactiva invisible de un input 48px */ }
                <div 
                    className="
                        absolute
                        inset-0
                        "
                    onMouseDown={(e) => {
                        e.preventDefault();
                        
                        e.currentTarget.nextSibling.focus();
                    }}
                />
                {/*=====================================================*/ }    
                {/*Area visual del input*/}
                <input 
                    type={type}
                    className={`
                        relative
                        w-full
                        h-12
                        rounded-md
                        border
                        border-border
                        px-4
                        text-base
                        
                        hover:
                        hover:border-2
                        hover:border-focus-border

                        focus:outline-none
                        focus:ring-1
                        focus:ring-focus-ring
                        ${error ? "border-red-600": "text-text-primary"}
                    
                        `}
                    {...props}

             />
            
            </div>
              {/*Feedback message */}
              {error && <p className="text-caption text-red-600 place-self-start">{error}</p>}
          </div>

    )
};