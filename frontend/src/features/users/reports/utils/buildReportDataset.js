// Funcion utilitaria para construir el dataset del reporte

export function buildReportDataset({
    users,
    selectedFields,
    scope,
    documentNumber
}) {

    let filteredUsers = [...users];

    // filtro por documento
    if (scope === "document" && documentNumber) {

        filteredUsers = filteredUsers.filter(
            (user) =>
                user.documentNumber === documentNumber
        );
    }

    // encabezados
    const headers =
        selectedFields.map(
            (field) => field.label
        );

    // filas
    const rows = filteredUsers.map((user) =>

        selectedFields.map((field) => {

            const value = user[field.key];

            return value ?? "";
        })
    );

    return {
        headers,
        rows
    };
}