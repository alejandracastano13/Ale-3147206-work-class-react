/**
 * Conponente Boton 
 * 
 * Boton reutilizable con variables visuales y tamaños controladdos, area 
 * interactiva minima de 48px
 * **/
export default function Button({
    variant = "primary" ,// define el estilo visual 
    size = "md",         //Define tamaño visual 
    type = "button",     //Tipo de boton (button, submit, reset)
    children,           //contenido interno del boton (texto, icono)
    ...props            //Propiedades adicionales como un (onclick, disable, etc)
}){
    
    const variants = {
        primary: "bg-green  text-brand border text-body hover:bg-surface-muted hover:text-text-inverse",
        secondary: "bg-background border boreder-border text-text-primary hover:bg-surface-muted hover:text-text-inverse",
    };

    const sizes = {
        sm: `
            h-9 px-3
            before:absolute before:content['']
            before:-inset-y[6px] before:-inset-x-[0px]
        `,
        md:`
            h-10 px-4
            before:absolute before:content['']
            before:-inset-y[7px] before:-inset-x-[0px]
        `,
    }

    return(

        <button 
            className={` 
            relative           
            inline-flex items-center justify-center
            rounded-md
            transition-colors
            ${variants[variant]}
            ${sizes[size]}
            ${type}
            `}
            {...props}
            

            
            >
            {children}

        </button>
    )

}