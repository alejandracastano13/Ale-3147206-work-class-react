//El chekbox necesita un id, no aceptas clases 
export default function Checkbox({
    id,                     //identificador unico (Necesario para accesibilidad)
    name,                   //Nombre del caompo(Util para formulario)
    label,                  //Texto visble asociado al checkbox
    checked = false,        //Estado controlado del checkbox
    onChange,               //Funcion que maneja el cambio de estado
    disabled = false,        //indica si el checkbox esta habilitado 
    className = "",         //Clases adicionales para personalizacion 

}) {

    return(
        <label
            htmlFor={id}
            className={`
                flex items-center gap-2
                text-sm
                cursor-pointer
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                ${className}
            `}
        >
            {/* {Input del checkbox} */}
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                className="w-5 h-5"
            />
            {/* {Texto del chacbox} */}

            <span>{label}</span>
        </label>
    );
}


