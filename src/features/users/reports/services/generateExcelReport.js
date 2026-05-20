// Liberia para mnaipulacion de y generacion de archivois excel

import * as XLSX from "xlsx";

// funcion utilitaria para generar un archivo excel a partir de datos tabulares
// patron: exportacion de datos ( dataset -> archivo descargable)

export function generateExcelReport ({
    headers,                            // array de encabezados (columnas)
    rows,                               // array de filas ( array de arrays)
    fileName = "user-report.xlsx"       // nombre del archivo de salida 
}) {


    // estructura final de la hoja:
    // primera fila = headers
    // siguuente filas = datos
    const worksheetData = [
        headers,
        ...rows
    ];

    // convierte un array de arrays (AOA = aarray of arrays) en una hoja de excel
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // crea un  nuevo libro0 de excel (workbook)
    const workbook = XLSX.utils.book_new();

    // agrega la hoja al libro con el nombre " usuarios"
    XLSX.utils.book_append_sheet(workbook, worksheet, "usuarios");

    // genera y descarga el archivo excel en el cliente
    XLSX.writeFile(workbook, fileName);

}