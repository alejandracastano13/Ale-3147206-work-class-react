//  Funcion utilitaria para construir el dataset de un reporte (tabla)
// Patron: transformacion de datos input-> output listo para explorar

export function buildReportDataset({
    users,                  //Array de usuarios origen
    selectedFields,         // Campos seleccionados para el reporte [{ key, label}]
    scope,                  // Alcance del reporte: "all" | "document"
    documentNumber          // Numero de documento para filtrar
})  {

    let filteredUsers = [...users];

    // Filtro por alcance : si es por documento, se aplica filtro especifico
    if (scope === "docuemt" && documentNumber) {
        filteredUsers = filteredUsers.filter(
            (users) => users.document_number === documentNumber
        );
    }

    // Contruccion de encabezados de reporte
    // Setoma el label de cada campo seleccionado
    const headers = selectedFields.map((field) => field.label);

    // construccion de filas del reporte
    // cada usuario se transforma en un array de valores segun los campos seleccionados
    const rows = filteredUsers.map((user) =>
    selectedFields.map((field) => {
        const value = user[field.key]; // acceso dinamico a la propiedad

        // normalizacion : evita undefined o null en el reporte
        return value ?? "";
    })
);

// estructura final desacoplada dela ui
// lista para exportar a excel, pdf o renderizar en tabla
return {
    headers,   
    rows 
}

}